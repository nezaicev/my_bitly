const RowTable = (props) => {
    return (
        <tr>
            <td>{props.index}</td>
            <td><a href={props.link}>{props.link}</a></td>
            <td><a href={props.short_link}>{props.short_link}</a> </td>
        </tr>

    )
}


const Redirects = (props) => {
    const [redirectState, setRedirectState] = React.useState([]);
    React.useEffect(() => {
        getData()
    }, [])


    const Table = ReactBootstrap.Table
    const Form = ReactBootstrap.Form
    const Row = ReactBootstrap.Row
    const Col = ReactBootstrap.Col
    const Button = ReactBootstrap.Button

    function postData() {
        axios.post('/api/links/', {
            redirect: {
                link: 'https://github.com/axios/axios',
                short_link: 'Flintstone'
            }
        })
            .then(function (response) {
                console.log(response);
                 setRedirectState(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function getData() {
        axios.get('/api/links/')
            .then(function (response) {
                console.log(response);
                setRedirectState(response)

            })
            .catch(function (error) {
                // console.log(error);
            });
    }


    const rows=redirectState.map((r,index)=>{
        return(

            <RowTable index={index} key={index+1} link={r['link']} short_link={r['short_link']}/>
        )
    })

    return [
        <div>
            <Form>
                <Row>
                    <Col>
                        <Form.Control placeholder="First name"/>
                    </Col>
                    <Col>
                        <Form.Control placeholder="Last name"/>
                    </Col>
                </Row>
            </Form>
            <Button onClick={postData}>Отправить</Button>
            <Button onClick={getData}>Получить</Button>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Link</th>
                    <th>Short link</th>

                </tr>
                {rows}


                </thead>
            </Table>

        </div>,
    ]
}


ReactDOM.render(
    <Redirects/>,
    document.getElementById("app")
)