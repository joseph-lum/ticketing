import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    // Cross namespace communication uses a different pattern - check out kubectl get namespace
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};

export default buildClient;