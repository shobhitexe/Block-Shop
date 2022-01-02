import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from "../components/Rating";
import axios from 'axios'
import { listProductDetails, createProductReview, loadReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'


function ProductScreen ({ match, history }) {
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([])
    const [connectionEstablished, setConnectionEstablished] = useState(true)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    (async() =>
    {
        try
        {
            setReviews(await loadReview(match.params.id))
        }
        catch
        {
            setConnectionEstablished(false)
        }
    })()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id,
            document.getElementById('comment').value
        ))
    }
    // const product= products.find((p) => p._id == match.params.id)
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ₹{product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>₹{product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}


                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock == 0}
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                             <Row>
                                <Col md={6}>
                                    <h4 style={{marginTop: '30px'}} >Reviews</h4>
                                    {connectionEstablished && reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                                    {!connectionEstablished && <Message variant='danger'>Failed to Load Reviews. 
                                    Please ensure that you have metamask installed and that you
                                    connect to the Dapp using metamask with a valid ethereum account. For more information please <Link to="/help">Click Here</Link>
                                    </Message>}
                                    <ListGroup variant='flush'>
                                         {reviews.map((review) => (
                                            <ListGroup.Item key={review[0]}>
                                                 {/* <strong>{userInfo ? userInfo.username : '' }</strong> */}
                                                <strong>{review[0]}</strong>
                                                <p>{review[1]}</p> 
                                            </ListGroup.Item>
                                        ))} 
                                        
                                        
                                    </ListGroup>

                                </Col>
                            </Row>
                        </div> 
                    )

            }


        </div > 
    )
}


export default ProductScreen

