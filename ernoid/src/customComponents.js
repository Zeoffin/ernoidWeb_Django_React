import styled from "@material-ui/core/styles/styled";
import Button from "@material-ui/core/Button";

export const CustomButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 25,
    letterSpacing: '.1rem',
    marginRight: '30px',
    padding: '6px 30px',
    border: '2px solid',
    lineHeight: 1.5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: '30px',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'white',
    },
});

export const ItemCustomButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '2px solid',
    lineHeight: 1.5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: '30px',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white'
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'white',
    },
});