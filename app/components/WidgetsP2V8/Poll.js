/**
 *
 * Poll
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { CheckCircle } from '@material-ui/icons';
import PollIcon from 'components/Icons/Poll';
import { submitPoll as submitPollAction } from 'containers/WidgetContainer/actions';
// import { surveySummary } from 'containers/AuthBase/actions';
import Link from 'utils/helpers/Link';
import RoundButton from 'utils/helpers/roundButton';
import {
  WidgetCard,
  WidgetContainer,
  WidgetContent,
  WidgetAvatar,
  PollCheckbox,
} from './Wrapper';

function MultipleAnswers({ uid, question }) {
  const dispatch = useDispatch();
  const [answerIds, setAnswerIds] = useState(question.votedAnswerIds || []);
  const handleAnswer = e => {
    const value = parseInt(e.target.value, 10);
    if (!e.target.checked) {
      setAnswerIds(_.without(answerIds, value));
    } else {
      setAnswerIds([...answerIds, value]);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormGroup>
          {_.map(question.answers, answer => (
            <FormControlLabel
              key={answer.id}
              control={
                <PollCheckbox
                  value={answer.id}
                  checked={_.includes(answerIds, answer.id)}
                  onChange={handleAnswer}
                />
              }
              label={answer.answer}
              disabled={!question.active || question.votedUser}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid item>
        <RoundButton
          color="secondary"
          variant="contained"
          disableElevation
          endIcon={<CheckCircle />}
          onClick={() =>
            dispatch(
              submitPollAction(uid, {
                allowMultipleAnswers: true,
                answerIds,
                questionId: question.id,
              }),
            )
          }
          disabled={!question.active || question.votedUser}
        >
          {question.votedUser ? 'Submitted' : 'Submit'}
        </RoundButton>
      </Grid>
    </Grid>
  );
}

MultipleAnswers.propTypes = {
  uid: PropTypes.string,
  question: PropTypes.object,
};

function SingleAnswer({ uid, question }) {
  const dispatch = useDispatch();
  const [answerId, setAnswerId] = useState(question.votedAnswerId || null);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RadioGroup
          value={answerId}
          onChange={e => setAnswerId(parseInt(e.target.value, 10))}
        >
          {_.map(question.answers, answer => (
            <FormControlLabel
              key={answer.id}
              value={answer.id}
              control={<Radio color="primary" />}
              label={answer.answer}
              disabled={!question.active || question.votedUser}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Grid item>
        <RoundButton
          color="secondary"
          variant="contained"
          disableElevation
          endIcon={<CheckCircle />}
          onClick={() =>
            dispatch(
              submitPollAction(uid, {
                allowMultipleAnswers: false,
                answerId,
                questionId: question.id,
              }),
            )
          }
          disabled={!question.active || question.votedUser}
        >
          {question.votedUser ? 'Submitted' : 'Submit'}
        </RoundButton>
      </Grid>
    </Grid>
  );
}

SingleAnswer.propTypes = {
  uid: PropTypes.string,
  question: PropTypes.object,
};

function Poll({ uid, questions }) {
  return (
    <WidgetCard>
      <WidgetContainer>
        <WidgetContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <WidgetAvatar $spacing={6}>
                    <PollIcon />
                  </WidgetAvatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">
                    Q: Votez pour vos fonctionnalités préférées?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {_.map(questions, question => (
              <Grid item xs={12} key={question.id}>
                {question.allowMultipleAnswers ? (
                  <MultipleAnswers uid={uid} question={question} />
                ) : (
                  <SingleAnswer uid={uid} question={question} />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Link color="textSecondary" underline="always" to="/">
                View More options
              </Link>
            </Grid>
            <Grid item xs={12}>
              <RoundButton
                color="secondary"
                variant="contained"
                disableElevation
                endIcon={<CheckCircle />}
                style={{ marginRight: 8 }}
              >
                Submit
              </RoundButton>
              <RoundButton variant="outlined">
                Résultat de la sélection
              </RoundButton>
            </Grid>
          </Grid>
        </WidgetContent>
      </WidgetContainer>
    </WidgetCard>
  );
}

Poll.propTypes = {
  // title: PropTypes.string,
  uid: PropTypes.string,
  questions: PropTypes.array,
};

export default memo(Poll);
