fast-srp-hap
===

![NPM-Version](https://badgen.net/npm/v/fast-srp-hap)
![NPM-Downloads](https://badgen.net/npm/dt/fast-srp-hap)
![Node-CI](https://github.com/homebridge/fast-srp/workflows/Node-CI/badge.svg)

Is a pure [NodeJS](https://nodejs.org/) implementation of the [SRP6a protocol](http://srp.stanford.edu/).

It's a derived work of [Jed Parson](http://jedparsons.com/)'s [node-srp](https://github.com/jedp/node-srp) and [Tom Wu](http://www-cs-students.stanford.edu/~tjw/)'s [jsbn](http://www-cs-students.stanford.edu/~tjw/jsbn/).

Creating the Verifier
---

```ts
import { SRP } from 'fast-srp-hap';

/**
 * Computes the verifier of a user. Only needed to add the user to the auth system.
 *
 * @param {string} I Username to compute verifier
 * @param {string} P Password
 * @return {Promise<{salt: Buffer, verifier: Buffer}>}
 */
async function srp6a_create_user(I: string, P: string) {
  const salt = await SRP.genKey(32);
  
  return {
    // The salt is required for authenticating the user later
    salt,
    verifier: SRP.computeVerifier(SRP.params[4096], salt, Buffer.from(I), Buffer.from(P)),
  };
}

await srp6a_create_user('Zarmack Tanen', '*****').then(({salt, verifier}) => {
  console.log('SRP6a verifier and salt of Zarmack Tanen user is %s and %s',
    verifier.toString('hex'), salt.toString('hex'));
});
```

Server
---

```ts
import {SRP, SrpServer} from 'fast-srp-hap';

(async () => {
  // Get the user details from somewhere
  const user = {
    username: 'username', // Or a Buffer

    // If we have the plaintext password
    salt: await SRP.genKey(32),
    password: 'password', // Or a Buffer
    
    // If we have a saved verifier
    salt: Buffer.from('...'),
    verifier: Buffer.from('...'),
  };

  // Generate a secret key
  const secret = await SRP.genKey(32);

  const server = new SrpServer(SRP.params[3076], user, secret); // For Apple SRP use params.hap

  // ...
})();
```
