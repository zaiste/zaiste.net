
+++

+++
# How to Show Failed Login Attemps

```bash 
lastb -a | awk '{print $10}' | grep -v ^192 | sort | uniq | sed '/^$/d'
```

