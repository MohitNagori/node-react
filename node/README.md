## Demo Service
- Authenticate using middlewares
- Save json as file and get json
- Global handler
- Unit and Integration test

#### Dependencies
`npm install`

#### Local Dev Run
- ##### Run project
    `npm run start`
- ##### Run tests
    `npm run test`

#### Docker Run
- Set `HOST=host.docker.internal` in .env    
- ##### Run project
    `docker build -t demo_node . && docker run -p 3000:3000 demo_node`
- ##### Run tests
    `docker build -t demo_node_test -f Dockerfile.test . && docker run demo_node_test`