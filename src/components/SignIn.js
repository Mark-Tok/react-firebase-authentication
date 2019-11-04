import React from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import Button from '@material-ui/core/Button';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask'
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { getSuccessInfo } from '../store/success/actions';
import { getErrorInfo } from '../store/error/actions';
import Dialog from './Popup'
import { setStatusTrue, setStatusFalse } from '../store/session/actions';
import { withRouter } from 'react-router-dom';


const StyledButton = withStyles({
    root: {
        background: '#4285f4',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        width: '100%',
        padding: '0 30px',
        margin: '10px 0px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "&:hover": {
            backgroundColor: "#306bcc"
        }
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const StyledInput = withStyles({
    root: {
        width: '100%',
        borderColor: '#4285f4',
        color: '#4285f4',
        '& .Mui-focused': {
            color: '#4285f4',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#4285f4',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4285f4',
            },
        },
    }
})(TextField);

const StyledTypography = withStyles({
    root: {
        fontSize: '13px',
        padding: '15px 0px',
        color: '#d32f2f'
    },
})(Typography);

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: null,
            phone: '',
            showPhone: true,
            showIn: false,
            code: null,
            lengthPhone: null
        }
    }
    send = () => {
        if (this.state.phone === '') {
            alert('Введите номер')
        }
        else if (this.state.lengthPhone !== 11) {
            alert('Неккоректный номер')
        }
        else {
            let phoneNumber = this.state.phone
            let appVerifier = window.recaptchaVerifier;
            this.props.firebase.auth.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(
                    (confirmationResult) => {
                        this.setState({ showPhone: false, showIn: true });
                        window.confirmationResult = confirmationResult;
                        window.recaptchaVerifier.render().then(function (widgetId) {
                            window.recaptchaWidgetId = widgetId;
                        });
                    }).catch(function (error) {
                        console.log(error)
            });
        }
    }

    handleOnChangePhone = (value) => {
        let lengthPhone = value.replace(/[-+()\s]/g, '').split('').length
        this.setState({
            phone: value,
            lengthPhone: lengthPhone
        });
    }
    handleOnChangeCode = (event) => {
        this.setState({
            code: event.target.value
        });
    }
    sign = () => {
        var code = this.state.code;
        let { getSuccessInfo, getErrorInfo, setStatusTrue } = this.props;
        window.confirmationResult.confirm(code).then((result) => {
            let currentDate = new Date();
            let obj = {
                phone: this.state.phone,
                date: currentDate.toString(),
                status: true
            }
            getSuccessInfo(obj)
            setStatusTrue({status:true});
            window.grecaptcha.reset();
            this.props.history.push('/usersuccess')
        }).catch((error) => {
            let currentDate = new Date();
            let obj = {
                phone: this.state.phone,
                date: currentDate.toString(),
                status: true,
                reason: 'Неверный смс код',
                code: this.state.code
            }
            getErrorInfo(obj)
            console.log('ошибка', error)
        });
    }
    forwardCode = () => {
        window.grecaptcha.reset();
        this.setState({ showIn: false, showPhone: true })
    }
    signOut = () => {
        this.setState({ showIn: false, showPhone: true })
        this.props.firebase.auth.auth().signOut()
        window.grecaptcha.reset(window.recaptchaWidgetId)
    }
    componentDidMount() {
        window.recaptchaVerifier = new this.props.firebase.auth.auth.RecaptchaVerifier(this.recaptcha, {
            'size': 'invisible',
        });
    }
    render() {
        return (
            <div>
                {this.state.showPhone &&
                    <Grid justify="center"
                        alignItems="center" container>
                        <Grid item xs={12}>
                            <div>
                                <PhoneInput  defaultCountry={'ru'} value={this.state.phone} onChange={this.handleOnChangePhone} />
                                <StyledButton id="sign-in-button" startIcon={<PhonelinkRingIcon />}  onClick={this.send}>отправить код</StyledButton>
                            </div>
                        </Grid>
                    </Grid>}
                {this.state.showIn &&
                    <Grid justify="center"
                        alignItems="center" container>
                        <Grid item xs={3}>
                            <InputMask
                                mask="999999"
                                onChange={this.handleOnChangeCode}>
                                {() => <StyledInput inputRef={el => this.fv = el} label="Введите код"
                                    margin="normal"
                                    variant="outlined"
                                />}
                            </InputMask>
                            <StyledButton variant="contained" color="primary" onClick={this.sign}>
                                войти
                        </StyledButton>
                            <StyledTypography>
                                На указанный вами номер отправлен 6-ти значный код, введите код в поле ниже.
                                Если вход не осуществляется, причину можно посмотреть в логах, по кнопке ниже.
                            </StyledTypography>
                            <Dialog />
                            <StyledButton variant="contained" color="primary" onClick={this.forwardCode}>
                                Отправить код повторно
                            </StyledButton>
                        </Grid>
                    </Grid>
                }
                <div ref={(ref) => this.recaptcha = ref}>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        successPhone: state.success,
    }
}

const mapActionToProps = {
    getSuccessInfo,
    getErrorInfo,
    setStatusTrue,
    setStatusFalse
}
export default connect(mapStateToProps, mapActionToProps)(withRouter(SignIn));
