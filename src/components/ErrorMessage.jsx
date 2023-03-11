
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function ErrorMessage({props}) {

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }

  return (
    <Container style={styles}>
      <div>
        <h1>Oh My!</h1>
        <p>{props.message}</p>
        {props.additionalInfo && <p><i>{props.additionalInfo}</i></p>}
        <p>Please return to the <Link to={props.link.href}>{props.link.text}</Link>.</p>
      </div>
    </Container>
  )

}


