# circleci-trigger

Simple script to trigger a CircleCI build...

```sh
npx circleci-trigger \
  -p github/<user>/<repo> \
  -b <branch> \
  -k <apikey> \
  -j <CIRCLE_JOB>
```
