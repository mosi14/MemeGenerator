import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Meme from "./meme";

const Home = (props) => {
  //const [showButton, setshowButton] = useState(false);
  const memeList = props.memeList;
  const isLoggedIn = props.isLoggedIn;
 
  return (
    <>
      <Container fluid>
        <Row className="mt-5">
          {memeList.map((meme) => (
              <Meme key={meme.id} meme={meme} isLoggedIn={isLoggedIn} deleteMeme={props.deleteMeme} username={props.username}/>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
