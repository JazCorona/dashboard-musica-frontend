### HTTP Missing Security Headers (http-missing-security-headers:cross-origin-opener-policy) found on dashboard-frontend

----
**Details**: **http-missing-security-headers:cross-origin-opener-policy** matched at dashboard-frontend

**Protocol**: HTTP

**Full URL**: http://dashboard-frontend:3000

**Timestamp**: Thu Oct 15 05:57:18 +0000 UTC 2026

**Template Information**

| Key | Value |
| --- | --- |
| Name | HTTP Missing Security Headers |
| Authors | socketz, geeknik, g4l1t0, convisoappsec, kurohost, dawid-czarnecki, forgedhallpass, jub0bs, userdehghani, celbahraoui, safejulian |
| Tags | misconfig, headers, generic, vuln |
| Severity | info |
| Description | This template searches for missing HTTP security headers. The impact of these missing headers can vary.<br> |
| CWE-ID | [CWE-693](https://cwe.mitre.org/data/definitions/693.html) |
| CVSS-Score | 0.00 |

**Request**
```http
GET / HTTP/1.1
Host: dashboard-frontend:3000
User-Agent: Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36
Accept: */*
Accept-Language: en
Accept-Encoding: gzip


```

**Response**
```http
HTTP/1.1 307 Temporary Redirect
Transfer-Encoding: chunked
Cache-Control: s-maxage=31536000, stale-while-revalidate
Connection: keep-alive
Content-Type: text/html; charset=utf-8
Date: Thu, 15 Oct 2026 05:57:18 GMT
Etag: "nm1lhg1f6m2rh"
Keep-Alive: timeout=5
Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding
X-Nextjs-Cache: HIT
X-Powered-By: Next.js

<!DOCTYPE html><html id="__next_error__"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/webpack-35b091ca5c5192ac.js"/><script src="/_next/static/chunks/fd9d1056-cad07ff62dc08b0b.js" async=""></script><script src="/_next/static/chunks/117-cec1e5ac55864acb.js" async=""></script><script src="/_next/static/chunks/main-app-6fca1515cee9a03c.js" async=""></script><title>Dashboard Musica Clasica</title><script src="/_next/static/chunks/polyfills-42372ed130431b0a.js" noModule=""></script></head><body><script src="/_next/static/chunks/webpack-35b091ca5c5192ac.js" async=""></script><script>(self.__next_f=self.__next_f||[]).push([0]);self.__next_f.push([2,null])</script><script>self.__next_f.push([1,"1:I[2846,[],\\"\\"]\\n4:I[4707,[],\\"\\"]\\n5:I[6423,[],\\"\\"]\\n7:I[1060,[],\\"\\"]\\n8:[]\\n0:[\\"$\\",\\"$L1\\",null,{\\"buildId\\":\\"bYOzMe4x5A44JuyYo2fyX\\",\\"assetPrefix\\":\\"\\",\\"urlParts\\":[\\"\\",\\"\\"],\\"initialTree\\":[\\"\\",{\\"children\\":[\\"__PAGE__\\",{}]},\\"$undefined\\",\\"$undefined\\",true],\\"initialSeedData\\":[\\"\\",{\\"children\\":[\\"__PAGE__\\",{},[[\\"$L2\\",\\"$L3\\",null],null],null]},[[null,[\\"$\\",\\"html\\",null,{\\"lang\\":\\"es\\",\\"children\\":[\\"$\\",\\"body\\",null,{\\"style\\":{\\"fontFamily\\":\\"system-ui, sans-serif\\",\\"margin\\":0,\\"background\\":\\"#0f1222\\",\\"color\\":\\"#eef\\"},\\"children\\":[\\"$\\",\\"div\\",null,{\\"style\\":{\\"maxWidth\\":900,\\"margin\\":\\"0 auto\\",\\"padding\\":24},\\"children\\":[\\"$\\",\\"$L4\\",null,{\\"parallelRouterKey\\":\\"children\\",\\"segmentPath\\":[\\"children\\"],\\"error\\":\\"$undefined\\",\\"errorStyles\\":\\"$undefined\\",\\"errorScripts\\":\\"$undefined\\",\\"template\\":[\\"$\\",\\"$L5\\",null,{}],\\"templateStyles\\":\\"$undefined\\",\\"templateScripts\\":\\"$undefined\\",\\"notFound\\":[[\\"$\\",\\"title\\",null,{\\"children\\":\\"404: This page could not be found.\\"}],[\\"$\\",\\"div\\",null,{\\"style\\":{\\"fontFamily\\":\\"system-ui,\\\\\\"Segoe UI\\\\\\",Roboto,Helvetica,Arial,sans-serif,\\\\\\"Apple Color Emoji\\\\\\",\\\\\\"Segoe UI Emoji\\\\\\"\\",\\"height\\":\\"100vh\\",\\"textAlign\\":\\"center\\",\\"display\\":\\"flex\\",\\"flexDirection\\":\\"column\\",\\"alignItems\\":\\"center\\",\\"justifyContent\\":\\"center\\"},\\"children\\":[\\"$\\",\\"div\\",null,{\\"children\\":[[\\"$\\",\\"style\\",null,{\\"dangerouslySetInnerHTML\\":{\\"__html\\":\\"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}\\"}}],[\\"$\\",\\"h1\\",null,{\\"className\\":\\"next-error-h1\\",\\"style\\":{\\"display\\":\\"inline-block\\",\\"margin\\":\\"0 20px 0 0\\",\\"padding\\":\\"0 23px 0 0\\",\\"fontSize\\":24,\\"fontWeight\\":500,\\"verticalAlign\\":\\"top\\",\\"lineHeight\\":\\"49px\\"},\\"children\\":\\"404\\"}],[\\"$\\",\\"div\\",null,{\\"style\\":{\\"display\\":\\"inline-block\\"},\\"children\\":[\\"$\\",\\"h2\\",null,{\\"style\\":{\\"fontSize\\":14,\\"fontWeight\\":400,\\"lineHeight\\":\\"49px\\",\\"margin\\":0},\\"children\\":\\"This page could not be found.\\"}]}]]}]}]],\\"notFoundStyles\\":[]}]}]}]}]],null],null],\\"couldBeIntercepted\\":false,\\"initialHead\\":[null,\\"$L6\\"],\\"globalErrorComponent\\":\\"$7\\",\\"missingSlots\\":"])</script><script>self.__next_f.push([1,"\\"$W8\\"}]\\n3:E{\\"digest\\":\\"NEXT_REDIRECT;replace;/dashboard;307;\\"}\\n"])</script><script>self.__next_f.push([1,"6:[[\\"$\\",\\"meta\\",\\"0\\",{\\"name\\":\\"viewport\\",\\"content\\":\\"width=device-width, initial-scale=1\\"}],[\\"$\\",\\"meta\\",\\"1\\",{\\"charSet\\":\\"utf-8\\"}],[\\"$\\",\\"title\\",\\"2\\",{\\"children\\":\\"Dashboard Musica Clasica\\"}]]\\n2:null\\n"])</script></body></html>
```


**CURL command**
```sh
curl -X 'GET' -d '' -H 'Accept: */*' -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36' 'http://dashboard-frontend:3000'
```

----

Generated by [Nuclei v3.11.1](https://github.com/projectdiscovery/nuclei)