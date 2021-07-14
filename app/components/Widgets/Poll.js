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
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { CheckCircleOutline } from '@material-ui/icons';
import { submitPoll as submitPollAction } from 'containers/WidgetContainer/actions';
import { surveySummary } from 'containers/AuthBase/actions';
import { AnswerBar } from './Wrapper';

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
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <FormGroup style={{ paddingLeft: 11 }}>
          {_.map(question.answers, answer => (
            <FormControlLabel
              key={answer.id}
              control={
                <Checkbox
                  color="primary"
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
        <Button
          endIcon={<CheckCircleOutline />}
          onClick={() =>
            dispatch(
              submitPollAction(uid, {
                allowMultipleAnswers: true,
                answerIds,
                questionId: question.id,
              }),
            )
          }
          color="primary"
          disabled={!question.active || question.votedUser}
        >
          {question.votedUser ? 'Submitted' : 'Submit'}
        </Button>
      </Grid>
    </Grid>
  );
}

function SingleAnswer({ uid, question }) {
  const dispatch = useDispatch();
  const [answerId, setAnswerId] = useState(question.votedAnswerId || null);
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <RadioGroup
          value={answerId}
          onChange={e => setAnswerId(parseInt(e.target.value, 10))}
          style={{ paddingLeft: 11 }}
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
        <Button
          endIcon={<CheckCircleOutline />}
          onClick={() =>
            dispatch(
              submitPollAction(uid, {
                allowMultipleAnswers: false,
                answerId,
                questionId: question.id,
              }),
            )
          }
          color="primary"
          disabled={!question.active || question.votedUser}
        >
          {question.votedUser ? 'Submitted' : 'Submit'}
        </Button>
      </Grid>
    </Grid>
  );
}

function Poll({ uid, questions }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Vote');
  return (
    <>
      <Paper square variant="outlined" style={{ marginBottom: 16 }}>
        <Tabs
          variant="fullWidth"
          value={activeTab}
          onChange={(e, value) => setActiveTab(value)}
        >
          <Tab label="Vote" value="Vote" />
          <Tab label="Result" value="Result" />
        </Tabs>
      </Paper>
      <Grid container spacing={2}>
        {activeTab === 'Vote' &&
          _.map(questions, question => (
            <Grid item xs={12} key={question.id}>
              <Paper
                square
                elevation={0}
                style={{ background: '#F2F2F2', padding: 11 }}
              >
                <Typography>{`Q: ${question.question}`}</Typography>
              </Paper>
              {question.allowMultipleAnswers ? (
                <MultipleAnswers uid={uid} question={question} />
              ) : (
                <SingleAnswer uid={uid} question={question} />
              )}
            </Grid>
          ))}
        {activeTab === 'Result' && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(surveySummary(uid))}
                  color="primary"
                >
                  Télécharger
                </Button>
              </Grid>
              {_.map(questions, question => (
                <Grid item xs={12} key={question.id}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper
                        square
                        elevation={0}
                        style={{ background: '#F2F2F2', padding: 11 }}
                      >
                        <Typography>{`Q: ${question.question}`}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        {_.map(question.answers, answer => (
                          <Grid item xs={12} key={answer.id}>
                            <Typography>{answer.answer}</Typography>
                            <AnswerBar
                              variant="determinate"
                              value={answer.votedPercent}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

MultipleAnswers.propTypes = {
  uid: PropTypes.string,
  question: PropTypes.object,
};
SingleAnswer.propTypes = {
  uid: PropTypes.string,
  question: PropTypes.object,
};
Poll.propTypes = {
  uid: PropTypes.string,
  questions: PropTypes.array,
};

export default memo(Poll);
