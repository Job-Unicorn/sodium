export const alias = 'User'

export const schema = {
  $schema : 'http://json-schema.org/draft-07/schema#',
  title : 'User',
  type : 'object',
  properties : {
    name : {
      type : 'string',
      minLength : 1,
      maxLength : 255,
      example : 'John Doe'
    },
    email : {
      type : 'string',
      format : 'email',
      minLength : 1,
      maxLength : 255,
      example : 'johndoe@email.com'
    },
    linkedin : {
      type : 'string',
      format : 'url',
      minLength : 1,
      maxLength : 800,
      example : 'https://linkedin.com/in/john-doe'
    },
    resume : {
      type : 'string',
      format : 'url',
      minLength : 1,
      maxLength : 1000,
      example : 'https://ipfs.infura.io/john-doe'
    },
  }
}