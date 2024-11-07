import {Card} from "react-bootstrap";
import moment from "moment";
import {useEffect, useState} from "react";
import AnimatedNumber from "./animated-number.jsx";

const CardStatistics = ({ title, range, icon, data }) => {
    const [count, setCount] = useState(0);

    function getStatistics(days) {
        const now = moment();

        return data.filter(movie => {
            if (!movie.checked || !movie.updated_at) return false;

            const updatedDate = moment(movie.updated_at, "DD/MM/YYYY HH:mm:ss");

            if (days === 0) {
                // Apenas hoje
                return updatedDate.isSame(now, 'day');
            } else if (days === 1) {
                // Somente ontem
                return updatedDate.isSame(moment().subtract(1, 'days'), 'day');
            } else {
                // Últimos "days" dias
                return updatedDate.isAfter(moment().subtract(days, 'days').startOf('day'));
            }
        }).length;
    }

    useEffect(() => {
        if (data.length > 0) {
            setCount(() => getStatistics(range))
        }

    }, [data]);


    return (
        <Card >
            <Card.Body className="text-start">
                <h3>{title}</h3>
                <Card.Text>
                    <h2 className={"mb-0 text-end"}>
                        <AnimatedNumber value={count}/>
                    </h2>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardStatistics