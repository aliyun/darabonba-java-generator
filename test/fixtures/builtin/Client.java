// This file is auto-generated, don't edit it. Thanks.
package com.aliyun.test;

import com.aliyun.darabonba.*;
import com.aliyun.test.models.*;

public class Client {

    public static void formTest(java.util.List<String> args) throws Exception {
        java.util.Map<String, Object> m = TeaConverter.buildMap(
            new TeaPair("key1", "test1"),
            new TeaPair("key2", "test2"),
            new TeaPair("key3", 3),
            new TeaPair("key4", TeaConverter.buildMap(
                new TeaPair("key5", 123),
                new TeaPair("key6", "321")
            ))
        );
        String form = FormUtils.toFormString(m);
        form = form + "&key7=23233&key8=" + FormUtils.getBoundary();
        java.io.InputStream r = FormUtils.toFileForm(m, FormUtils.getBoundary());
    }

    public static void fileTest(java.util.List<String> args) throws Exception {
        if (File.exists("/tmp/test")) {
            $File file = new $File("/tmp/test");
            String path = file.path();
            int length = file.length() + 10;
            $Date createTime = file.createTime();
            $Date modifyTime = file.modifyTime();
            int timeLong = modifyTime.Diff("minute", createTime);
            byte[] data = file.read(300);
            file.write(BytesUtils.From("test", "utf8"));
            java.io.InputStream rs = File.createReadStream("/tmp/test");
            writable ws = File.createWriteStream("/tmp/test");
        }

    }

    public static void dateTest(java.util.List<String> args) throws Exception {
        $Date date = new $Date("2023-09-12 17:47:31.916000 +0800 UTC");
        String dateStr = date.Format("YYYY-MM-DD HH:mm:ss");
        int timestamp = date.Unix();
        $Date yesterday = date.Sub("day", 1);
        int oneDay = date.Diff("day", yesterday);
        $Date tomorrow = date.Add("day", 1);
        int twoDay = tomorrow.Diff("day", date) + oneDay;
        int hour = date.Hour();
        int minute = date.Minute();
        int second = date.Second();
        int dayOfMonth = date.DayOfMonth();
        int dayOfWeek = date.DayOfWeek();
        // var weekOfMonth = date.weekOfMonth();
        int weekOfYear = date.WeekOfYear();
        int month = date.Month();
        int year = date.Year();
    }

    public static void urlTest(java.util.List<String> args) throws Exception {
        $URL url = new $URL(args.get(0));
        String path = url.path();
        String pathname = url.pathname();
        String protocol = url.protocol();
        String hostname = url.hostname();
        String port = url.port();
        String host = url.host();
        String hash = url.hash();
        String search = url.search();
        String href = url.href();
        String auth = url.auth();
        $URL url2 = URL.parse(args.get(1));
        path = url2.path();
        String newUrl = URL.urlEncode(args.get(2));
        String newSearch = URL.percentEncode(search);
        String newPath = URL.pathEncode(pathname);
        String all = "test" + path + protocol + hostname + hash + search + href + auth + newUrl + newSearch + newPath;
    }

    public static void streamTest(java.util.List<String> args) throws Exception {
        if (File.exists("/tmp/test")) {
            java.io.InputStream rs = File.createReadStream("/tmp/test");
            writable ws = File.createWriteStream("/tmp/test");
            byte[] data = StreamUtils.Read(rs, 30);
            ws.Write(data, 0, data.length);
            StreamUtils.Pipe(rs, ws);
            data = StreamUtils.readAsBytes(rs);
            Object obj = StreamUtils.readAsJSON(rs);
            String jsonStr = StreamUtils.readAsString(rs);
        }

    }

    public static void xmlTest(java.util.List<String> args) throws Exception {
        java.util.Map<String, Object> m = TeaConverter.buildMap(
            new TeaPair("key1", "test1"),
            new TeaPair("key2", "test2"),
            new TeaPair("key3", 3),
            new TeaPair("key4", TeaConverter.buildMap(
                new TeaPair("key5", 123),
                new TeaPair("key6", "321")
            ))
        );
        String xml = XmlUtils.toXML(m);
        xml = xml + "<key7>132</key7>";
        java.util.Map<String, Object> respMap = XmlUtils.parseXml(xml, null);
    }

    public static void loggerTest(java.util.List<String> args) throws Exception {
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
        System.out.println("test");
        System.err.println("test");
    }

    public static void envTest(java.util.List<String> args) throws Exception {
        String es = System.getenv("TEST");
        System.setProperty("TEST", es + "test");
    }

    public static void numberTest(java.util.List<String> args) throws Exception {
        float num = 3.2F;
        int inum = MathUtils.parseInt(num);
        long lnum = MathUtils.parseLong(num);
        float fnum = MathUtils.parseFloat(num);
        double dnum = MathUtils.parseDouble(num);
        inum = MathUtils.parseInt(inum);
        lnum = MathUtils.parseLong(inum);
        fnum = MathUtils.parseFloat(inum);
        dnum = MathUtils.parseDouble(inum);
        inum = MathUtils.parseInt(lnum);
        lnum = MathUtils.parseLong(lnum);
        fnum = MathUtils.parseFloat(lnum);
        dnum = MathUtils.parseDouble(lnum);
        inum = MathUtils.parseInt(fnum);
        lnum = MathUtils.parseLong(fnum);
        fnum = MathUtils.parseFloat(fnum);
        dnum = MathUtils.parseDouble(fnum);
        inum = MathUtils.parseInt(dnum);
        lnum = MathUtils.parseLong(dnum);
        fnum = MathUtils.parseFloat(dnum);
        dnum = MathUtils.parseDouble(dnum);
        lnum = inum;
        inum = (int)lnum;
        double randomNum = Math.random();
        inum = MathUtils.floor(inum);
        inum = MathUtils.round(inum);
        // var min = $Number.min(inum, fnum);
        // var max = $Number.max(inum, fnum);
    }

    public static void stringTest(java.util.List<String> args) throws Exception {
        String fullStr = String.join(",", args);
        args = fullStr.split(",");
        if ((fullStr.length() > 0) && fullStr.contains("hangzhou")) {
            String newStr1 = fullStr.replace("/hangzhou/g", "beijing");
        }

        if (fullStr.startsWith("cn")) {
            String newStr2 = fullStr.replace("/cn/gi", "zh");
        }

        if (fullStr.endsWith("beijing")) {
            String newStr3 = fullStr.replace("/beijing/", "chengdu");
        }

        int start = fullStr.indexOf("beijing");
        int end = start + 7;
        String region = fullStr.substring(start, end);
        String region1 = fullStr.substring(2, 10);
        String lowerRegion = region.toLowerCase();
        String upperRegion = region.toUpperCase();
        if (region.equals("beijing")) {
            region = region + " ";
            region = region.trim();
        }

        byte[] tb = fullStr.toBytes("utf8");
        String em = "xxx";
        if (em.isEmpty()) {
            return ;
        }

        String num = "32.01";
        int inum = Integer.parseInt(num) + 3;
        long lnum = Long.parseLong(num);
        float fnum = Float.parseFloat(num) + 1F;
        double dnum = Double.parseDouble(num) + 1D;
    }

    public static void arrayTest(java.util.List<String> args) throws Exception {
        if ((args.size() > 0) && args.contains("cn-hanghzou")) {
            int index = args.indexOf("cn-hanghzou");
            String regionId = args.get(index.intValue());
            String all = String.join(",", args);
            String first = ListUtils.shift(args);
            String last = ListUtils.pop(args);
            int length1 = ListUtils.unshift(args, first);
            int length2 = ListUtils.push(args, last);
            int length3 = length1 + length2;
            String longStr = "long" + first + last;
            String fullStr = String.join(",", args);
            java.util.List<String> newArr = java.util.Arrays.asList(
                "test"
            );
            java.util.List<String> cArr = ListUtils.concat(newArr, args);
            java.util.List<String> acsArr = ListUtils.sort(newArr, "acs");
            java.util.List<String> descArr = ListUtils.sort(newArr, "desc");
            java.util.List<String> llArr = ListUtils.concat(acsArr, descArr);
            ListUtils.append(llArr, "test", 10);
            ListUtils.remove(llArr, "test");
        }

    }

    public static void jsonTest(java.util.List<String> args) throws Exception {
        java.util.Map<String, Object> m = TeaConverter.buildMap(
            new TeaPair("key1", "test1"),
            new TeaPair("key2", "test2"),
            new TeaPair("key3", 3),
            new TeaPair("key4", TeaConverter.buildMap(
                new TeaPair("key5", 123),
                new TeaPair("key6", "321")
            ))
        );
        Thread.sleep(10);
        String ms = JSONUtils.stringify(m);
        Object ma = JSONUtils.parseJSON(ms);
        String arrStr = "[1,2,3,4]";
        Object arr = JSONUtils.parseJSON(arrStr);
        Object res = JSONUtils.readPath(m, "$.key4.key5");
    }

    public static Object returnAny() throws Exception {
    }

    public static void main(String[] args) throws Exception {
        int a = ConverterUtils.parseInt(args[0]) + 10;
        String b = a.toString() + args[1] + Client.returnAny().toString();
        Number c = ConverterUtils.parseDouble(b) + ConverterUtils.parseDouble(a) + ConverterUtils.parseDouble(Client.returnAny());
        int d = ConverterUtils.parseInt(b) + ConverterUtils.parseInt(a) + ConverterUtils.parseInt(Client.returnAny());
        int e = ConverterUtils.parseInt(b) + ConverterUtils.parseInt(a) + ConverterUtils.parseInt(Client.returnAny());
        int f = ConverterUtils.parseInt(b) + ConverterUtils.parseInt(a) + ConverterUtils.parseInt(Client.returnAny());
        long g = ConverterUtils.parseLong(b) + ConverterUtils.parseLong(a) + ConverterUtils.parseLong(Client.returnAny());
        long h = ConverterUtils.parseLong(b) + ConverterUtils.parseLong(a) + ConverterUtils.parseLong(Client.returnAny());
        long i = ConverterUtils.parseLong(b) + ConverterUtils.parseLong(a) + ConverterUtils.parseLong(Client.returnAny());
        int j = ConverterUtils.parseInt(b) + ConverterUtils.parseInt(a) + ConverterUtils.parseInt(Client.returnAny());
        int k = ConverterUtils.parseInt(b) + ConverterUtils.parseInt(a) + ConverterUtils.parseInt(Client.returnAny());
        int l = ConverterUtils.parseInt(b) + ConverterUtils.parseInt(a) + ConverterUtils.parseInt(Client.returnAny());
        long m = ConverterUtils.parseLong(b) + ConverterUtils.parseLong(a) + ConverterUtils.parseLong(Client.returnAny());
        float n = ConverterUtils.parseFloat(b) + ConverterUtils.parseFloat(a) + ConverterUtils.parseFloat(Client.returnAny());
        double o = Double.parseDouble(b.toString()) + Double.parseDouble(a.toString()) + Double.parseDouble(Client.returnAny().toString());
        if (ConverterUtils.parseBoolean(args[2])) {
            // bytes 强转只允许传字符串
            byte[] data = ConverterUtils.toBytes(b);
            int length = data.length;
            Object test = data;
            java.util.Map<String, String> maps = TeaConverter.buildMap(
                new TeaPair("key", "value")
            );
            java.util.Map<String, Object> obj = (Map<String, Object>)(maps);
            writable ws = ConverterUtils.toWritable(obj);
            java.io.InputStream rs = ConverterUtils.toReadable(maps);
            data = StreamUtils.Read(rs, 30);
            if (!(null == data)) {
                ws.Write(data, 0, data.length);
            }

        }

        String defaultVal = args[0] == null ? args[0] : args[1].toString();
        if (defaultVal == b) {
            return ;
        }

        // test binaryOp
        if (d > 0.toString()) {
        }

        if (!(null == ConverterUtils.parseBoolean(args[2]) || ConverterUtils.parseBoolean(args[0]))) {
        }

        if (ConverterUtils.parseInt(c + d) > 0) {
        }

        if (ConverterUtils.parseInt(c + d) > 0) {
        }

        if (ConverterUtils.parseInt(c + d) > 0) {
        }

        if (ConverterUtils.parseLong(c + d) > 0) {
        }

        if (ConverterUtils.parseInt(c + d) > 0) {
        }

        if (ConverterUtils.parseInt(c + d) > 0) {
        }

        if (ConverterUtils.parseInt(c + d) > 0) {
        }

        if (ConverterUtils.parseLong(c + d) > 0) {
        }

        if (ConverterUtils.parseLong(c + d) > 0) {
        }

        if (ConverterUtils.parseLong(c + d) > 0) {
        }

        if (ConverterUtils.parseFloat(n + n) > 0F) {
        }

        if (Double.parseDouble(o + o.toString()) > 0D) {
        }

        if (ConverterUtils.parseBoolean(c + d)) {
        }

    }

    public static void bytesTest(java.util.List<String> args) throws Exception {
        String fullStr = String.join(",", args);
        byte[] data = fullStr.toBytes("utf8");
        String newFullStr = new String(data, "UTF-8");
        if (fullStr != newFullStr) {
            return ;
        }

        String hexStr = BytesUtils.ToHex(data);
        String base64Str = java.util.Base64.getEncoder().encodeToString(data);
        int length = data.length;
        String obj = new String(data, "UTF-8");
        byte[] data2 = BytesUtils.From(base64Str, "base64");
    }

    public static void mapTestCase(java.util.List<String> args) throws Exception {
        java.util.Map<String, String> mapTest = TeaConverter.buildMap(
            new TeaPair("key1", "value1"),
            new TeaPair("key2", "value2"),
            new TeaPair("key3", "value3")
        );
        int length = mapTest.size();
        int num = length + 3;
        java.util.List<String> keys = new java.util.ArrayList<>(mapTest.keySet());
        String allKey = "";
        for (String key : keys) {
            allKey = allKey + key;
        }
        java.util.List<undefined> entries = new java.util.ArrayList<>(mapTest.entrySet());
        String newKey = "";
        String newValue = "";
        for (undefined e : entries) {
            newKey = newKey + e.getKey();
            newValue = newValue + e.getValue();
        }
        String json = JSONUtils.stringify(mapTest);
        java.util.Map<String, String> mapTest2 = TeaConverter.buildMap(
            new TeaPair("key1", "value4"),
            new TeaPair("key4", "value5")
        );
        java.util.Map<String, Object> mapTest3 = ConverterUtils.Merge(mapTest , mapTest2);
        if (mapTest3.get("key1") == "value4") {
            return ;
        }

    }

    public static void modelTestCase(java.util.List<String> args) throws Exception {
        Test test = Test.build(TeaConverter.buildMap(
            new TeaPair("name", "test")
        ));
        java.util.Map<String, Object> testMap = test.ToMap();
        int len = testMap.size();
    }
}
