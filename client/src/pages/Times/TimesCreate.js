import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Col, message } from 'antd'

import { useHistory } from 'react-router-dom'
import * as timesStore from '../../store/ducks/times'
import EditTimeForm from '../../components/forms/EditTimeForm'

function TimesCreate({ createTimes }) {
  const history = useHistory()

  const handleSubmit = async data => {
    try {
      const { payload: time } = await createTimes(data)

      message.success('Time cadastrado com sucesso.')

      history.push(`/app/times/${time.id}`)
    } catch (error) {
      message.error(
        'Ocorreu um erro ao tentar cadastrar o time. Revise os dados e tente novamente.'
      )
    }
  }

  return (
    <Card>
      <Row>
        <Col xs={24} md={16} lg={12} xl={8}>
          <EditTimeForm time={null} onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Card>
  )
}

TimesCreate.propTypes = {
  createTime: PropTypes.func.isRequired,
}

export default connect(null, {
  createTime: timesStore.createTime,
})(TimesCreate)