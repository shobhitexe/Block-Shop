import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col ,Table} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile} from '../actions/userActions'
import {Web3} from 'web3'
import {getPublicKey,web3} from './LoginScreen'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from "../actions/orderActions";
import { loadLoyalty } from '../actions/productActions'
function ProfileScreen({ history }) {

    const [public_key, setPublickey] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [loyalty, setLoyalty] = useState(0)

    const dispatch = useDispatch()

    window.onload= getPublicKey()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }else{
            if(!user || !user.username || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            }else{
                setEmail(user.email)
                setUsername(user.username)
            }
        }
    }, [dispatch,history, userInfo,user,success])

    const submitHandler = (e) => {
        e.preventDefault()
        // const public_address=document.getElementById('public_key').value
        // if (!web3.utils.isAddress(public_address)) {
        //     setMessage('Invalid ethereum address..')
        // } 
            dispatch(updateUserProfile({
                'id': user._id,
                'email': email,
                'username': username,}))
            
        


    }

    (async() =>
    {
        setLoyalty(await loadLoyalty(userInfo.public_key))
    })()

    return (
        <div>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>

                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type='username'
                                placeholder='Enter username..'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter email address..'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='loyalty'>
                            <Form.Label>Loyalty Points</Form.Label>
                            <Form.Control
                                readOnly
                                value={loyalty}
                                onChange={(e) => setLoyalty(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        {/* <Form.Group controlId='public_key'>
                            <Form.Label>Public Key</Form.Label>
                            <Form.Control
                                required
                                type='public_key'
                                placeholder='Enter ethereum public key..'
                                value={public_key}
                                onChange={(e) => setPublickey(e.target.value)}
                            >       
                            </Form.Control>
                        </Form.Group> */}


                        <Button type='submit' variant='primary'>
                            Update
                        </Button>

                    </Form>
                </Col>

                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadingOrders ? (
                    <Loader />
                    ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                    ) : (
                    <Table striped responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                        {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                        ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm">Details</Button>
                        </LinkContainer>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            )}
            </Col>
        </Row>
        </div>
    );
}

export default ProfileScreen
