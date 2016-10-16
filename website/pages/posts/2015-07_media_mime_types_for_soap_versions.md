---
created_at: 2015-07-07
kind: article
publish: true
title: "Media (MIME) types for SOAP versions"
tags:
- mime
- soap
---

[RFC7303][1] clarifies that there is no difference between `text/xml` and
`application/xml`.

> The registration information for text/xml is in all respects the same as that
given for application/xml above (Section 9.1), except that the "Type name" is "text".

[SOAP][2] is, however, a pretty old protocol and each media type is treated
differently.

`text/xml` is the SOAP 1.1 content type and `application/soap+xml` is the
content type for SOAP 1.2.

[Axis2][3] will use `SOAPMessageFormatter` for those content types while
`application/xml` is [only used][4] to format the XML using `ApplicationXMLFormatter`
which won't generate a proper SOAP request.

You can set SOAP version on the client using `setSOAPVersionURI()` method i.e.

```
serviceClient.getOptions().setSoapVersionURI(
  org.apache.axiom.soap.SOAP11Constants.SOAP_ENVELOPE_NAMESPACE_URI);
```

[1]: http://www.ietf.org/rfc/rfc7303.txt
[2]: https://en.wikipedia.org/wiki/SOAP
[3]: https://axis.apache.org/
[4]: https://svn.apache.org/repos/asf/axis/axis2/java/core/scratch/java/veithen/spring/axis2-spring-core/src/main/resources/axis2_default_spring.xml
