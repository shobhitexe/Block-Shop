import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, createProductReview, loadReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function Comment( { item }) {
    
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([])
    const [processing, setProcessing] = useState(false)
    const [err, setErr] = useState('')
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
        setErr('')
        e.preventDefault()
        setProcessing(true)
        dispatch(createProductReview(
        item,
        document.getElementById(item).value
        ))
    }
    

    var old_alert = window.alert;
    
    window.alert = function(msg) 
    { 
        if (processing == false)
        {
            return
        }
        setProcessing(false)
        console.log(msg)
        setErr(msg)
        old_alert(msg); 
    };

    return (
        <div>
            <ListGroup.Item style={{marginTop: '30px'}}>
            <h4>Write a review</h4>
            {loadingProductReview && <Loader />}
            {successProductReview && <Message variant='success'>Review Submitted</Message>}
            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
            {err.startsWith('Success :') && <Message variant='success'>{err}</Message>}
            {err.startsWith('Error :') && <Message variant='danger'>{err}</Message>}
            {processing && <Loader/>}
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
                        Submit Review
                    </Button>

                </Form> 
            
        </ListGroup.Item>
        </div>
    )
}

export default Comment
