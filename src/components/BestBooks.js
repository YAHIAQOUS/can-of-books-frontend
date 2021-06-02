import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
// import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import AddBook from './AddBook';
import UpdateBook from './UpdateBook'


class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            server: process.env.REACT_APP_PORT,

            displayAddModal: false,
            displayUpdateModal: false,

            index: 0,
            bookName: '',
            bookDescription: '',
            imgURL: '',
            bookStatus: ''
        }
    }
    componentDidMount = async () => {
        const { user } = this.props.auth0;
        // console.log('inside componentDidMount');
        // console.log(user);
        let initialData = await axios.get(`${process.env.REACT_APP_PORT}books?email=${user.email}`)
        // console.log(resultArray);
        this.setState({
            bookData: initialData.data
        })
        // console.log(this.state.bookData);
    }
 
    
    showAddModal = async (e) => {
        this.setState({
            displayAddModal: true
        })
    }
    hideAddModal = async (e) => {
        this.setState({
            displayAddModal: false,
            displayUpdateModal: false
        })
    }
    
    updateBookData = (e) => {
        this.setState({
            bookData: e
        })
    }
    
    
    showUpdateForm = (idx) => {
        let choosenBook = this.state.bookData.filter((val, index) => {
            return idx === index;
        })
        console.log(choosenBook);
        
        // this.state.choosenBook.push(choosenBook[0])
        // console.log(this.state.choosenBook);
        
        this.setState({
            displayUpdateModal: true,
            bookName: choosenBook[0].name,
            bookDescription: choosenBook[0].description,
            imgURL: choosenBook[0].imgURL,
            bookStatus: choosenBook[0].status,
            index: idx
        })
        console.log(this.state);
    }
    updateBookName = (event) => {
        this.setState({
            bookName: event.target.value
        })
        console.log(this.state.bookName);
    }
    updateDescription = (event) => {
        this.setState({
            bookDescription: event.target.value
        })
        console.log(this.state.bookDescription);
    }
    updateImg = (event) => {
        this.setState({
            imgURL: event.target.value
        })
        console.log(this.state.imgURL);
    }
    updateStatus = (event) => {
        this.setState({
            bookStatus: event.target.value
        })
        console.log(this.state.bookStatus);
    }
    
    
    deleteBook = async (idx) => {
        let { user } = this.props.auth0;
        user = { email: user.email }
        console.log(idx);
        const deleteBook = await axios.delete(`${process.env.REACT_APP_PORT}deleteBook/${idx}`, { params: user })
        this.setState({
            bookData: deleteBook.data
        })
    }
    
    updatingBook = async (e) => {
        e.preventDefault()
        const { user } = this.props.auth0;
        const sentData = {
            bookName: this.state.bookName,
            bookDescription: this.state.bookDescription,
            imgURL: this.state.imgURL,
            bookStatus: this.state.bookStatus,
            email: user.email
        }

        let updatedBook = await axios.put(`${process.env.REACT_APP_PORT}updateBook/${this.state.index}`, sentData)
        console.log(updatedBook);

        this.setState({
            bookData: updatedBook.data.books,
            displayUpdateModal: false
        })
    }


    render() {
        return (
            <div>
                <button onClick={this.showAddModal}> Add Books</button>


                <AddBook
                    displayAddModal={this.state.displayAddModal}
                    hideModal={this.hideAddModal}
                    updateBookData={this.updateBookData} />


                <UpdateBook
                    displayUpdateModal={this.state.displayUpdateModal}
                    hideAddModal={this.hideAddModal}

                    bookName={this.state.bookName}
                    bookDescription={this.state.bookDescription}
                    imgURL={this.state.imgURL}
                    bookStatus={this.state.bookStatus}

                    updateBookName={this.updateBookName}
                    updateDescription={this.updateDescription}
                    updateImg={this.updateImg}
                    updateStatus={this.updateStatus}

                    updatingBook={this.updatingBook}
                />


                {/* <Carousel> */}

                {this.state.bookData.length &&
                
                    this.state.bookData.map((item, idx) => {
                        return (
                            <CardGroup >
                                <Card style={{ width: '18rem' }} >

                                    <Card.Img variant="top" src={item.imgURL} />

                                    <Card.Body>

                                        <Card.Title>{item.name}</Card.Title>

                                        <Card.Text>
                                            <p>{item.description}</p>
                                            <p>{item.status}</p>
                                        </Card.Text>

                                        <Button onClick={() => this.deleteBook(idx)} variant="primary">Delete Book</Button>
                                        
                                        <Button onClick={() => this.showUpdateForm(idx)} variant="primary">Update Book</Button>
                                    </Card.Body>
                                </Card>
                            </CardGroup>

                            // <Carousel.Item key={idx} interval={1000}>
                            //     <img
                            //         className="d-block w-100"
                            //         src={item.imgURL}
                            //         alt="First slide" width='100' height='200'
                            //     />
                            //     <Carousel.Caption>
                            //         {/* <h3> {item.name}</h3> */}
                            //         {/* <p>{item.description}</p> */}
                            //     </Carousel.Caption>
                            //     <h4> {item.name}</h4> 
                            //     <p>{item.description}</p>
                            // </Carousel.Item>
                        )
                    })
                }
                {/* </Carousel> */}
            </div>
        )
    }
}
export default withAuth0(BestBooks);