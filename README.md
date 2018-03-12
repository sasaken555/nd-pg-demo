# Node.js & PostgreSQL DataAccess on Dokcer

## Summary

For Node.js & PostgreSQL DataAccess test.
The App in this repo run on Docker.
If you want to run as a native Node.js App, that's fine!

## Usage

1. Clone this Repo

```
git clone git@github.com:sasaken555/nd-pg-demo.git
```

2. Build Docker Image

```
cd nd-pg-demo
docker build -t nd-pg-demo .
```

3. Start PostgreSQL

4. Run App via Docker Container

```
docker run -d --rm -p 3000:3000 nd-pg-demo
```
