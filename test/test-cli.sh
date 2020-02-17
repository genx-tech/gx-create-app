DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"
rm -rf ./temp-app

node ../src/cli/index.js temp-app -n=sv-hosting -m=server
node ../src/cli/index.js temp-app -n=sv-api -m=app --merge