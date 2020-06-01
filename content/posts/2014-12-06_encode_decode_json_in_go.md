
+++
date = 2014-12-06T00:00:00.000Z


title = "Encode / Decode JSON in Go"
topics = [ "Go", "JSON" ]

+++

[json][1] package allows to easily implement encoding and decoding of JSON in Go
langauge.

Let's start with a Go `struct`

```
type Config struct {
    RepoName string   `json:"repository_name"`
    Domains  []string `json:"domains"`
    Env      string   `json:"env"`
}
```

Create an instance of `Config`

```
config := Config{"foo",
    []string{"bar.com", "baz.com"},
    "FOO=l\nBAR=69"}
```

Finally, marshal `config` instance using `json.Marshal` function.

```
r, err := json.Marshal(config)
```

The result is a `[]byte`, let's display it

```
fmt.Println(string(r))
```

Decoding is similar, but it uses `json.Unmarshal` function. Create another
`Config` variable which will be used to store the result of decoding.

```
var c2 Config
err := json.Unmarshal(r, &c2)
```

For a more in depth introduction to the subject check [JSON and Go][2] article.


[1]: http://golang.org/pkg/encoding/json/
[2]: http://blog.golang.org/json-and-go
