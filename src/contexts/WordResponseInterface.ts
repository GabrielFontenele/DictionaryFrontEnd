interface License {
  name: string
  url: string
}

interface Phonetic {
  audio: string
  sourceUrl: string
  license: License
  text: string
}

interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

interface LicenseWord {
  name: string
  url: string
}

export interface WordResponse {
  word: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  license: LicenseWord
  sourceUrls: string[]
}
