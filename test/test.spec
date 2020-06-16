module Mutil {

  type @get_timestamp = (): string
  type @get_nonce = (): string
  type @get_signature = ($Request): string
  type @json = ($Response): object
  type @not_ok = (object): boolean
  type @getGMTDateString = (): string
  type @getIp = (): string
  type @to_json = (any): object
  type @query = (any): object
  type @getContentLength = ($Request): string
  type @getContentMD5 = ($Request): string
  type @getAuthorization = ($Request): string
  type @isNotOk = ($Response): boolean
  type @readJSON = async ($Response): object
  type @is4xx = (object): boolean
  type @default = (any, string): string
  type @defaultNumber = (any, number): number
  type @endpoint = string
  type @endpoint_host = string
  type @accessKeyId = string
  type @userAgent = string
  type @protocol = string
  type @autoretry = string
  type @getDate = (): string
  type @getAuth = ($Request, string): string
  type @parseXml = async ($Response): object
  type @getBucketHost = (string): string
  type @header = (object): object
  type @IsSuccess= (object): boolean 

  prop version = '2019-01-01';
  init();

  model RuntimeObject = {
    ignoreSSL: boolean(description='ignoreSSL', name='ignoreSSL'),
    maxAttempts: number(description='max_attempts', name='max_attempts'),
    backoffPolicy: string(description='backoff_policy', name='backoff_policy'),
    backoffPeriod: number(description='backoff_period', name='backoff_period'),
  }

  model CustomMetric = {
    groupId: number(description='groupId', name='groupId'),
    metricName: string(description='metricName', name='metricName'),
    dimensions: object(description='dimensions', name='dimensions'),
    time: string(description='time', name='time'),
    type: number(description='type', name='type'),
    period: number(description='period', name='period'),
    values: object(description='values', name='values'),
  }

  model CustomMetricResponse = {
    requestId: string(description='requestId', name='requestId'),
    code: string(description='code', name='code'),
    message: string(description='message', name='message'),
    data: object(description='data', name='data'),
  }

  api uploadCustomMetric(metrics: [ CustomMetric ]): CustomMetricResponse {
    protocol = @protocol;
    method = 'POST';
    pathname = '/metric/custom/upload';
    headers = {
      content-type = 'application/json',
      date = @getGMTDateString(),
      host = @endpoint,
      x-cms-signature = 'hmac-sha1',
      x-cms-api-version = '1.0',
      x-cms-ip = @getIp(),
      user-agent = @userAgent
    };

    headers.content-length = @getContentLength(__request);
    headers.content-md5 = @getContentMD5(__request);
    headers.authorization = @getAuthorization(__request);
  } returns {
    if (@isNotOk(__response)) {
      throw {
        code = __response.statusCode
      }
    }
    var body = @readJSON(__response);
    if (@is4xx(body)) {
      throw {
        code = body.code,
        message = body.msg
      }
    }
    // {"code":"400","msg":"http body is empty, please see the doc on aliyun cloudmonitor"}
    return {
      requestId = body.requestId,
      code = body.code,
      message = body.msg
    };
  }

  api _request(action: string, protocol: string, method: string, request: object, runtime: object): object {
    protocol = protocol;
    method = method;
    pathname = '/';
    query = @query({
      Action = action,
      Format = 'json',
      Timestamp = @get_timestamp(),
      Version = __module.version,
      SignatureMethod = 'HMAC-SHA1',
      SignatureVersion = '1.0',
      SignatureNonce = @get_nonce(),
      AccessKeyId = @accessKeyId,
      ...request,
    });
    headers = {
      host = @endpoint_host,
    };
    query.Signature = @get_signature(__request);
  } returns {
    var body = @json(__response);
    if (@not_ok(body)) {
      throw {
        message = body.Message,
        data = body,
        code = body.Code,
      }
    }
    return body;
  } runtime {
    timeout = 10000,
    timeouted = 'retry',
    retry = {
      retryable = @autoretry,
      policy = 'simple',
      max-attempts = @defaultNumber(runtime.max_attempts, 3)
    },
    backoff = {
      policy = @default(runtime.backoff_policy, 'no'),
      period = @defaultNumber(runtime.backoff_period, 1)
    },
    ignoreSSL = runtime.ignoreSSL
  }

  model ModifyMonitorGroupInstancesRequest = {
    GroupId: long(description='GroupId', name='GroupId'),
    Data: {
      Category: {
        InstanceName: string(description='InstanceName', name='InstanceName'),
      }(description='Category', name='Category'),
      InstanceId: string(description='InstanceId', name='InstanceId'),
    }(description='Data', name='Data'),
    Instances: [
      {
        RegionId: string(description='RegionId', name='RegionId'),
      }
    ](description='Instances', name='Instances'),
  }

  model ModifyMonitorGroupInstancesResponse = {
    RequestId: string(description='RequestId', name='RequestId'),
    Success: boolean(description='Success', name='Success'),
    Code: integer(description='Code', name='Code'),
    Message: string(description='Message', name='Message'),
  }

  async function ModifyMonitorGroupInstances(request: ModifyMonitorGroupInstancesRequest, runtime: RuntimeObject): ModifyMonitorGroupInstancesResponse {
    return _request('ModifyMonitorGroupInstances', 'HTTPS', 'GET', request, runtime);
  }

  model PutBucketRequest = {
    BucketName: string(description='BucketName', name='BucketName'),
    DestObjectName: string(description='DestObjectName', name='DestObjectName'),
    UserMeta?: map[string]string(description='UserMeta', name='UserMeta'),
    Header: {
      copySource: string(description='x-oss-copy-source', name='x-oss-copy-source'),
      ifMatch?: string(description='x-oss-copy-source-if-match', name='x-oss-copy-source-if-match'),
    }(description='Header', name='Header'),
  }

  model PutBucketResponse = {
    RequestId: string(description='RequestId', name='RequestId'),
    UserMeta?: map[string]string(description='UserMeta', name='UserMeta'),
    copySource: string(description='x-oss-copy-source', name='x-oss-copy-source'),
    ifMatch?: string(description='x-oss-copy-source-if-match', name='x-oss-copy-source-if-match'),
  }

  api PutBucket(request: PutBucketRequest): PutBucketResponse {
    method = 'PUT';
    pathname =`/${request.DestObjectName}`;
    headers = {
      host = @getBucketHost(request.BucketName),
      date = @getDate(),
      ...request.Header,
    };
    headers.authorization = @getAuth(__request,request.BucketName);
  } returns {
    var respMap = @parseXml(__response);
    if (@IsSuccess(respMap)) {
      throw {
        code = respMap.Code,
        message = respMap.Message,
        data = {
          httpCode = __response.statusCode,
          requestId = respMap.RequestId,
          hostId = respMap.HostId,
        }
      };
    }
    return respMap;
  }
}