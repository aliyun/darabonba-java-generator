// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.darabonba.*;
import com.aliyun.darabonba.exceptions.*;
import com.import.*;
import com.import.models.*;

public class Client {

    public static void exceptionTest(java.util.List<String> args) throws Exception {
        if (args.size() < 0) {
            throw new ExtendFile()
                    .setCode("name")
                    .setKey2("value2")
                    .setData(TeaConverter.buildMap(
                        new TeaPair("name", "name"),
                        new TeaPair("path", "100")
                    ));
        }

    }

    public static void multiTryCatch(Number a) throws Exception {
        try {
            if (a > 0) {
                throw new Err1()
                        .setName("str")
                        .setCode("str")
                        .setData(TeaConverter.buildMap(
                            new TeaPair("key1", "str")
                        ));
            } else if (a == 0) {
                throw new Err2()
                        .setName("str")
                        .setCode("str")
                        .setAccessErrMessage("str2");
            } else if (a == -10) {
                throw new com.import.Client()
                        .setName("str")
                        .setCode("str");
            } else {
                throw new DaraException()
                        .setName("str")
                        .setCode("str");
            }

        } catch (Err1 err) {
            System.out.println(err.name);
        } catch (Err2 err) {
            System.out.println(err.name);
        } catch (Err3 err) {
            System.out.println(err.name);
        } catch (TeaException err) {
            System.out.println(err.name);
        } finally {
            String _final = "ok";
        }        
    }
}
