// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Review
{
    struct ProductReview
    {
        address sender;
        string description;
    }
    mapping(uint => ProductReview[]) product_reviews;
    mapping(address => uint) loyalty;
    mapping(address => mapping(uint => bool)) review_tokens;
    function getReviews(uint product_id) external view returns (ProductReview[] memory)
    {
        return product_reviews[product_id];
    }
    
    function addReview(uint product_id , string memory review) external 
    {
        review_tokens[msg.sender][product_id]=false;
        product_reviews[product_id].push(ProductReview(msg.sender,review));
        loyalty[msg.sender]+=100;
    }
    
    function getReviewToken(address user, uint product_id) external view returns (bool)
    {
        return review_tokens[user][product_id];
    }
    
    function addReviewTokens(address user, uint product_id) external 
    {
        review_tokens[user][product_id]=true;
    }
    
    function getLoyalty(address user) external view returns (uint)
    {
        return loyalty[user];
    }
}