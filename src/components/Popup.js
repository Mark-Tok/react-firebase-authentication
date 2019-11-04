import React from 'react';
import { Tabs, Tab, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const StyledButton = withStyles({
    root: {
        width: '100%',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            open: false,
            success: props.success,
            error: props.error
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { value } = this.state;
        return (
            <div className="popup">
                <StyledButton variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Лог попыток входа
                </StyledButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto">
                            <Tab label="Успех" />
                            <Tab label="Неудача" />
                        </Tabs>
                        {
                            this.props.success.map((item, index) => {
                                switch (value) {
                                    case 0:
                                        if (item.status !== false) {
                                            return <div key={index}>
                                                <ul class="success-info">
                                                    <li><span>Номер попытки:</span> {index}</li>
                                                    <li> <span>Phone number:</span> {item.phone}</li>
                                                    <li><span>Дата:</span> {item.date}</li>
                                                    <li><span>Статус:</span> Успех</li>
                                                </ul>
                                            </div>
                                        }
                                    break    
                                    default:
                                }
                            })
                        }
                        {   
                            this.props.error.map((item, index) => {
                                 switch (value) {
                                    case 1:
                                        if (item.status !== false) {
                                            return <div key={index}>
                                                <ul class="error-info">
                                                    <li><span>Номер попытки:</span> {index}</li>
                                                    <li><span>Статус:</span> Ошибка, введен неверный смс код</li>
                                                    <li> <span>Phone number:</span> {item.phone}</li>
                                                    <li><span>Дата:</span> {item.date}</li>
                                                    <li><span>Введенный код: </span> {item.code}</li>
                                                </ul>
                                            </div>
                                        }
                                    break    
                                    default:           
                                }
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        success: state.success,
        error: state.error
    }
}

export default connect(mapStateToProps)(Popup);
