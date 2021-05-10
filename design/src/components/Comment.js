import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, createProductReview, loadReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import {
    getOrderDetails,
    payOrder,
    deliverOrder,
  } from "../actions/orderActions";

function Comment( { item }) {
    
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([])
    const dispatch = useDispatch();

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
           document.getElementById(item).value=''
          dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        
    }, [dispatch, successProductReview]);

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(item),
        
        dispatch(createProductReview(
        item,
        document.getElementById(item).value
        ))
    }
    
    return (
        <div>
            <ListGroup.Item>
            <h4>Write a review</h4>
            {loadingProductReview && <Loader />}
            {successProductReview && <Message variant='success'>Review Submitted</Message>}
            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
            
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId={item}>
                        <Form.Label>Review</Form.Label>
                        <Form.Control
            
                            as='textarea'
                            row='5'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                    >
                        Submit
                    </Button>

                </Form> 
            
        </ListGroup.Item>
        </div>
    )
}

export default Comment
