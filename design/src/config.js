export const REVIEW_ADDRESS = '0xa1EdD8a1F0d0172BE4bd70abe04Ee5b480dc2fA8'

export const REVIEW_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "product_id",
        "type": "uint256"
      }
    ],
    "name": "getReviews",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          }
        ],
        "internalType": "struct Review.ProductReview[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "product_id",
        "type": "uint256"
      }
    ],
    "name": "getReviewCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "product_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "review",
        "type": "string"
      }
    ],
    "name": "addReview",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getLoyalty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]