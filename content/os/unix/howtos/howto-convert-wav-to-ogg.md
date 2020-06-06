+++
title = "How To Convert WAV to OGG"
+++

Install `vorbis-tools`

```bash
sudo apt install vorbis-tools
```

And encode using `oggenc`

```bash
oggenc -q 2 *.wav
```

-  `--downmix` downmix input from stereo to mono

