import { Injectable } from '@angular/core';
import * as sha3 from 'js-sha512';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  constructor() { }

  // A method that takes a string as input and returns a SHA-3 hash
  sha3_512(input: string) {
    return sha3.sha512(input);
  }

  sha3_384(input: string) {
    return sha3.sha384(input);
  }
  
  sha3_256(input: string) {
    return sha3.sha512_256(input);
  }
}