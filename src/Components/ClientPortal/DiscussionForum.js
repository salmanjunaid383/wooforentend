import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar'
import Nav from './Nav'
import './DiscussionForum.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Pusherr from './../Pusherr';

//Sidebar
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
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

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';


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
    paper: {
        width: 700,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));



function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 40 + rand();
    const left = 40 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function DiscussionForum() {
    let history = useHistory();


    const [user, setUser] = useState("");
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);


    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token);
    function getUserData() {

        const { data: response } = axios.get(`https://api.woofics.com/api/users/${decoded.sub}`)
            .then((response) => {
                setUser(response.data);

            }, (error) => {
                console.log(error);
            });
    }


    function Forum(e) {
        e.preventDefault();

        const { data: response } = axios.post(`https://api.woofics.com/api/forum_question`, {
            question: question,
            asked_by: user.first_name + " " + user.last_name,
            user_id: user.id
        })
            .then((response) => {
                handleClosee()
                getQuestion();
            }, (error) => {
                console.log(error);
            });
    }

    function getQuestion() {

        const { data: response } = axios.get(`https://api.woofics.com/api/forum_question`)
            .then((response) => {
                setQuestions(response.data);

            }, (error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getQuestion();
        getUserData()
    }, [])


    // Modal

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [openn, setOpenn] = React.useState(false);

    const handleOpenn = () => {
        setOpenn(true);
    };

    const handleClosee = () => {
        setOpenn(false);
    };

    //Sidebaaaaar/..........................
    // const { window } = props;
    // const classes = useStyles();
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
            name: ' Dashboard',
            icon: <DashboardIcon style={{ color: "#cdcdcd" }} />,
            to: 'dashboard'
        },
        {
            name: 'Services',
            icon: <InsertEmoticonIcon style={{ color: "#cdcdcd" }} />,
            to: 'addservice'
        },
        {
            name: 'Offers',
            icon: <LocalOfferIcon style={{ color: "#cdcdcd" }} />,
            to: 'customeroffer'
        },
        {
            name: 'Projects',
            icon: <PlaylistAddCheckIcon style={{ color: "#cdcdcd" }} />,
            to: 'project'
        },
        {
            name: 'Service Provider',
            icon: <AssistantIcon style={{ color: "#cdcdcd" }} />,
            to: 'suppliers'
        },
        {
            name: 'Discussion Forum',
            icon: <ContactMailIcon style={{ color: "white" }} />,
            to: 'clientdiscussionforum'
        },
        {
            name: 'Help',
            icon: <LiveHelpIcon style={{ color: "#cdcdcd" }} />,
            to: 'help'
        },
        {
            name: 'Complain',
            icon: <CallEndIcon style={{ color: "#cdcdcd" }} />,
            to: 'complain'
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
                        <ListItem button key={text} className={text.name == "Discussion Forum" ? classes.item : ''}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    // const container = window !== undefined ? () => window().document.body : undefined;


    const [name, setName] = useState([]);

    var token = localStorage.getItem("user_token");
    var decoded = jwt_decode(token)

    function notification() {
        const { data: response } = axios.get(`https://api.woofics.com/api/notification/${decoded.sub}`)
            .then((response) => {
                setName(response.data)
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

    useEffect(() => {
        chatnotification()

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
            .then((response) => {
                notification()
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
                                        <MailIcon color="primary" />
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
                                    <span className="text-white font-medium "><img className="img-fluid mb-2" src={Imagedata.profile_image} style={{ width: "40px", borderRadius: "50px" }} /></span>
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


                    <div className="float-right mt-4  mr-4">
                        <button type="submit" class="s-butto greenbtn text-white" onClick={handleOpenn}>Ask a Question?</button>
                    </div>
                    <div className="page-wrapper bg-light">
                        <div class="container mt-100">

                            <div class="row">
                                <div class="col-md-10 mx-auto">
                                    {
                                        questions == '' ? <h3 className="text-center my-auto">Nothing to show! Start a new Discussion...</h3> :
                                            questions.map((val, id) => {
                                                return (
                                                    <>

                                                        <Link to={`/clientmoredetailsdiscussionforum/${val.id}`}>
                                                            <div class="card mb-4 mx-auto">
                                                                <div class="card-header ">
                                                                    <div class="media flex-wrap w-100 align-items-center">
                                                                        {/* <img src={"https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg"} class="d-block ui-w-40 rounded-circle" alt="" /> */}
                                                                        <div class="media-body ml-3 ChatCapitalize"> <a href="javascript:void(0)" data-abc="true">{val.asked_by}</a>
                                                                            <div class="text-muted small">{(val.created_at).slice(0, 10)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-body">
                                                                    <p> {val.question}</p>
                                                                </div>
                                                                <div class="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                                                    <div class="px-4 pt-3"></div>
                                                                    <div class="px-4 pt-3"> <button type="button" class="btn greenbtn text-white"><i class="ion ion-md-create"></i>&nbsp; View more & Reply</button> </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </>
                                                )
                                            }).reverse()
                                    }
                                </div>
                            </div>
                        </div>


                        <div>

                            <Modal
                                open={openn}
                                onClose={handleClosee}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                className={classes.modal}

                            >
                                <div className={classes.paper}>
                                    <h2 id="simple-modal-title " className="mx-auto text-center "> Ask a Question ?</h2>
                                    <div className="container-fluid text-center">
                                        <div className="row">
                                            <div className="col-md-8  mx-auto">
                                                <textarea type="text" placeholder="Type your question here .........." onChange={(e) => setQuestion(e.target.value)}>

                                                </textarea>
                                                <button onClick={Forum} className="greenbtn text-white">Send Question </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
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
                {name == '' ? <Typography className={classes.typography}>
                    <a className="profile-pic" >
                        <span className="text-black font-medium ml-1">No Notification !</span>
                    </a>
                </Typography> :
                    name.slice(0, 5).map((val) => {
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
            > <Typography className={classes.typography}>
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


        </>
    );
}

