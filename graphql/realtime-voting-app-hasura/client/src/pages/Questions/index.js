import { useSubscription } from '@apollo/client';
import Loading from '../../components/Loading';
import { QUESTIONS_SUBSCRIPTIONS } from './queries';

import { Link } from 'react-router-dom';

function Questions() {
    const { loading, data } = useSubscription(QUESTIONS_SUBSCRIPTIONS);

    if(loading) {
        return <Loading />
    }

  return (
    <div>
        {
            data.questions.map((question) => (
                <div key={question.id}>
                    <Link to={`/q/${question.id}`}>{question.title}</Link>
                </div>
            ))
        }
    </div>
  )
}

export default Questions