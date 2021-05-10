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
    mapping(address => mapping(uint => bool)) has_reviewed;
    function getReviews(uint product_id) external view returns (ProductReview[] memory)
    {
        return product_reviews[product_id];
    }
    
    function getReviewCount(uint product_id) external view returns (uint )
    {
        return product_reviews[product_id].length;
    }
    
    function addReview(uint product_id , string memory review) external 
    {
        require (has_reviewed[msg.sender][product_id]==false,"You have already reviewed for this product!!");
        has_reviewed[msg.sender][product_id]=true;
        product_reviews[product_id].push(ProductReview(msg.sender,review));
        loyalty[msg.sender]+=100;
    }
  
    function getLoyalty(address user) external view returns (uint)
    {
        return loyalty[user];
    }
}