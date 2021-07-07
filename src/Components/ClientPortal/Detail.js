import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom'
import loginside from '../../Images/loginside.jpg'
import axios from 'axios';
import Sidebar from './Sidebar'
import Nav from './Nav'
import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';
import Supppliers from "./Suppliers";
import Pusher from 'pusher-js';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { loadStripe } from "@stripe/stripe-js";


//Sidebar
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import message from './—Pngtree—chat icon_4756851.png'
import DashboardIcon from '@material-ui/icons/Dashboard';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Dashboard from './Dashboard';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AssistantIcon from '@material-ui/icons/Assistant';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CallEndIcon from '@material-ui/icons/CallEnd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pusherr from './../Pusherr';

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: "white",
        boxShadow: 'none',
        border: "none",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundImage: "linear-gradient(180deg, #F62B84 0%, #934CFF 100%)",
        width: drawerWidth,
        boxShadow: 'none',
        border: "none"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
    typography: {
        padding: theme.spacing(1),
    },
    link: {
        textDecoration: 'none',
        color: '#cdcdcd',
        fontWeight: 'bolder'
    },
    // background-image:linear-gradient(180deg, #934CFF 0%, #F62B84 100%);
    item: {
        color: 'white',
        margin: '0px'
        , "&:hover": {
            color: 'white',
            margin: '0px'
        }
    },
}));



export default function Detail() {
    let history = useHistory();

    const { sid } = useParams();
    const { uid } = useParams();


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    const [form, setForm] = useState('');
    const [rating1, setRating1] = useState(4);
    const [supplier, setSupplier] = useState('');


    useEffect(() => {

        function Feedback() {
            const res = axios.get(`https://api.woofics.com/api/supplier_quotation/${uid}`)
                .then((res) => {
                    if (res) {
                        setForm(res.data)
                    }
                }, (error) => {
                    console.log(Error);
                    history.push('/allquotation');
                });

        }
        Feedback();
    }, [])

    useEffect(() => {

        function Supplierid() {
            const res = axios.get(`https://api.woofics.com/api/users/${sid}`)
                .then((res) => {
                    if (res) {
                        setSupplier(res.data)
                    }
                }, (error) => {
                    console.log(Error);
                    history.push('/allquotation');
                });

        }
        Supplierid();
    }, [])
    const [mxg, setMxg] = useState('');

    //Chat

    const [name, setName] = useState('');

    useEffect(() => {
        const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((response) => {
                setName(response.data.first_name + " " + response.data.last_name)
            }, (Error) => {
                console.log(Error);
            });
    })


    // const[suser,setaUser] = useState('');
    // const[sname,setaName] = useState('');

    function SendData(user, uname) {
        const { data: response } = axios.post(`https://api.woofics.com/api/associate`, {
            main_user: decoded.sub,
            associate_user: user,
            avatar: 'xyz.jpg',
            associate_name: uname,
            main_name: name
        })
            .then((response) => {
                if (response) {
                    history.push('/chat')
                }
            }, (Error) => {
                console.log(Error);
            });
    }

    //ModifyAllow ..................................................................change 1 to id 
    const [modify, setModify] = useState('Allow to Modify')
    function ModifyAllow() {
        const { data: response } = axios.put(`https://api.woofics.com/api/allow/${uid}`)
            .then((response) => {
                if (response) {
                    setModify('Allowed')
                }
            }, (Error) => {
                console.log(Error);
            });
    }

    //Stripe

    const stripePromise = loadStripe("pk_test_51IIWuIApAAjWKIoNrjwEcTyuCykDQVAqXWIBpwsNt1trDbRXD9n6uKPRvZlDKdQLNyIRiKaSAwpPgbUAjhEkqOJ400HEEcjDh1");


    const [coupon, setCoupon] = useState('-1')
    async function Stripe(e) {
        e.preventDefault();
        const stripe = await stripePromise;
        const { data: response } = axios.post(`https://api.woofics.com/api/stripe`, {
            currency: 'usd',
            quantity: 1,
            name: 'Items',
            description: 'All Items',
            quotation_id: form.id,
            coupon_code: coupon
        })
            .then((response) => {
                stripe.redirectToCheckout({
                    sessionId: response.data.session_id,
                });
            }, (Error) => {
                console.log(Error);
            });
    }

    //Sidebaaaaar/..........................
    // const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const url = window.location.href



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        notification()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;




    // popver Profile

    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id2 = open2 ? 'simple-popover' : undefined;



    const Data = [
        {
            name: 'Admin Dashboard',
            icon: <DashboardIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/dashboard'
        },
        {
            name: 'Services',
            icon: <InsertEmoticonIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/addservice'
        },
        {
            name: 'Offers',
            icon: <LocalOfferIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/customeroffer'
        },
        {
            name: 'Projects',
            icon: <PlaylistAddCheckIcon  style={{color:"white"}}/>,
            to: '/project'
        },
        {
            name: 'Service Provider',
            icon: <AssistantIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/suppliers'
        },
        {
            name: 'Discussion Forum',
            icon: <ContactMailIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/clientdiscussionforum'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/help'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon  style={{ color: "#cdcdcd" }}/>,
            to: '/complain'
        },


    ]

    const drawer = (
        <div>
            <Link className="navbar-brand " to="/dashboard">
                <span className="logo-text text-dark p-0 m-0 text-center">
                   <img src="assets/plugins/images/Woofic-2.png" className="img-fluid p-0 ml-3 " style={{ width: '150px' }} />
                </span>
            </Link>
            <div className={classes.toolbar} />
           
            <List>
                {Data.map((text, index) => (
                    <Link to={text.to} className={classes.link}>
                          <ListItem button key={text} className={text.name == "Projects"? classes.item : ''}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;

    const [newnoti, setnewnoti] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
            .then((response) => {
                setnewnoti(response.data)
                seen()
            }, (Error) => {
                console.log(Error);
            });
    }

    const [unseen, setunseen] = useState([]);
    function seen() {
        const { data: response } = axios.get(`https://api.woofics.com/api/unseen/${decoded.sub}`)
            .then((response) => {
                setunseen(response.data)
            }, (Error) => {
                console.log(Error);
            });
    }

     //................Chat Seen
     const [UnseenMxg, setUnseenMxg] = useState([]);
     function chatnotification() {
         const { data: response } = axios.get(`https://api.woofics.com/api/chat_unseen/${decoded.sub}`)
             .then((response) => {
                 setUnseenMxg(response.data)
                 seen()
             }, (Error) => {
                 console.log(Error);
             });
     }

    useEffect(() => {        chatnotification()

        seen()
    }, [])


    const [Imagedata, setImageData] = useState('');

    function getData() {
        const res = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((res) => {
                setImageData(res.data)
            }
            )

    }
   function notificationDelete(e) {
        const { data: response } = axios.delete(`https://api.woofics.com/api/notification/${e}`)
                .then((response) => {notification()
                }, (Error) => {
                        console.log(Error);
                });
}

    useEffect(() => {
        getData()
    }, [])
    return (
        <>

            <div className="d-sm-flex">
                {/* <CssBaseline /> */}
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <ul className="ml-auto d-flex my-auto">
                            <li className="my-auto">
                                <Link to="/chat" className="profile-pic" aria-describedby={id} variant="contained" color="primary" >
                                    <span className="text-white font-medium  "><Badge color="secondary" variant={UnseenMxg == 0 ? '' : 'dot'} >
                                        <MailIcon color="primary"/>
                                    </Badge></span>
                                </Link>
                            </li>
                            <li className="my-auto">
                                <a className="profile-pic" aria-describedby={id} variant="contained" data-toggle="tooltip" data-placement="top" title="Notifications" color="primary" onClick={handleClick}>
                                    <span className="text-white font-medium  Ring"><Badge color="secondary" variant={unseen == 0 ? '' : 'dot'} >
                                        <NotificationsIcon color="primary" />
                                    </Badge></span>
                                </a>
                            </li>
                            <li>
                                <a className="profile-pic" aria-describedby={id} data-toggle="tooltip" data-placement="top" title="Settings" variant="contained" color="primary" onClick={handleClick2}>
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata.profile_image }  style={{ width: "40px",borderRadius:"50px" }}/></span>
                                </a>
                            </li>
                        </ul>

                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            // container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                 <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Pusherr />


                   <div className="page-wrapper bg-light">
                        <div className="container">
                            <div class="card p-3">
                                <img class="card-img-top" src="https://servicesquare.com.pk/websitestyle/images/service-square-cover.jpg" alt="Card image cap" style={{ height: '250px' }} />

                                <div class="card-body pb-5">
                                    <div className="border p-5">
                                        <h4 className="mt-0">
                                            <img class="card-img-top img-fluid mr-3" style={{ width: '40px' }} src="https://img.pngio.com/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png" alt="Card image cap" />
                                            {supplier.first_name + " " + supplier.last_name}
                                            <span className="ml-2">
                                                <StarRatings
                                                    starRatedColor='rgb(230, 67, 47)'
                                                    rating={rating1}
                                                    starDimension="15px"
                                                    starSpacing="3px"
                                                />
                                            </span>
                                        </h4>
                                        <i className="fa fa-map-marker px-2 mb-4 ml-5 mt-0 text-muted"> {supplier.location}</i>
                                        <h2 className="float-right">$ {form.price}</h2>
                                        <table class="table table-hover table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Description</th>
                                                    <td> {form.description}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Delivery Days</th>
                                                    <td>{form.delivery_days} Days</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Status</th>
                                                    <td>{form.status}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Extra Comments</th>
                                                    <td>{form.extra_comments}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Price</th>
                                                    <td>{form.price}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <input type="text" placeholder="Coupon Code" onChange={(e) => setCoupon(e.target.value)} class="pull-left mt-3 w-25  border-success shadow" data-toggle="tooltip" data-placement="top" title="Apply Coupon (if any)"/> <br />
                                        <button class="btn pull-right marginBottom10 mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} onClick={Stripe} >Confirm Offer</button>
                                        <button class="btn pull-right marginBottom10 mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={supplier.id} onClick={() => SendData(supplier.id, supplier.first_name + " " + supplier.last_name)} >Chat</button>
                                        <button class="btn pull-right marginBottom10 mx-3" style={{ backgroundColor: 'rgba(7, 72, 138, 0.71)', color: 'white' }} value={supplier.id} onClick={() => ModifyAllow(supplier.id)}>{modify}</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                 {newnoti == '' ? <Typography className={classes.typography}>
                    <a className="profile-pic" >
                        <span className="text-black font-medium ml-1">No Notification !</span>
                    </a>
                </Typography> :
                    newnoti.slice(0, 5).map((val) => {
                        return (
                            <>
                                <Link to={`/${val.link}`}>
                                    <Typography className={`${classes.typography} bg-light text-dark`} >
                                        <a className="profile-pic" >
                                            <span className="text-black font-medium ml-1">{val.notification} <span className="float-right text-danger pl-md-2" onClick={() => notificationDelete(val.id)}><i className="fa fa-close"></i></span></span>
                                        </a>
                                    </Typography>
                                </Link>
                            </>
                        )
                    }).reverse()

                }
                <Link to='/clientallnotification'>
                    <Typography className={`${classes.typography} bg-dark text-light`} >
                        <a className="profile-pic" >
                            <span className="text-black font-medium ml-1">See all Notification <span className="float-right text-light pl-md-2"><i className="fa fa-arrow-right"></i></span></span>
                        </a>
                    </Typography>
                </Link>
            </Popover>



            {/* //profile popover */}

            <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose2}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
               <Typography className={classes.typography}>
          <Link
            className="profile-pic"
            to="/updateprofile"
            style={{ textDecoration: "none" }}
          >
            <i className="fa fa-user mx-3"></i>
            <span className="text-black font-medium mr-3">Profile</span>
          </Link>
        </Typography>
        <Typography className={classes.typography}>
          <a className="profile-pic" onClick={() => history.push("/responses")}>
            <i className="fa fa-support mx-3"></i>
            <span className="text-black font-medium mr-3">Help & Support</span>
          </a>
        </Typography>
        <hr />
        <Typography className={classes.typography}>
          <a className="profile-pic" onClick={() => history.push("/mycoupon")}>
            <i className="fa fa-heart mx-3"></i>
            <span className="text-black font-medium mr-3">My Coupons</span>
          </a>
        </Typography>
        <Typography className={classes.typography}>
                    <a className="profile-pic" onClick={() => { history.push('/') }}>
                        <i className="fa fa-home mx-3"></i>
                        <span className="text-black font-medium mr-3">Go home</span>
                    </a>
                </Typography>
        <Typography className={classes.typography}>
          <a
            className="profile-pic"
            onClick={() => {
              localStorage.removeItem("user_token");
              history.push("/");
            }}
          >
            <i className="fa fa-sign-out mx-3"></i>
            <span className="text-black font-medium mr-3">Logout</span>
          </a>
        </Typography>
      </Popover>

            {url === 'http://woofic.nastechltd.co/chat' ?
                ' '
                :
                <Link to="/chat">
                    <img src={message} style={{ width: '50px', position: 'fixed', float: 'right', bottom: '28px', right: '30px', zIndex: '100', backgroundColor: 'rgba(7, 72, 138, 0.71)', borderRadius: '50px' }} />
                </Link>
            }






            {/* <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={mxg}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            /> */}
        </>
    );
}

