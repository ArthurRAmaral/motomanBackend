import React, { Component } from 'react'
import { Table, Button, Dropdown, Menu } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ToolOutlined } from '@ant-design/icons'
import RemoveEventButton from './RemoveEventButton'
import EditEventButton from './EditEventButton'

class EventTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventsList: [],
    }
  }

  componentDidMount = () => {
    this.buildEventsTable()
  }

  componentDidUpdate = nextProps => {
    const { eventsList } = this.props
    if (nextProps.eventsList !== eventsList) {
      this.buildEventsTable()
    }
  }

  buildEventsTable() {
    const { eventsList } = this.props

    this.setState({
      eventsList: eventsList.map(event => ({
        ...event,
        key: event.id,
        logTypeName: event.logType.name,
      })),
    })
  }

  render() {
    const { loading } = this.props
    const { eventsList } = this.state

    return (
      <Table dataSource={eventsList} loading={loading}>
        <Table.Column dataIndex="logTypeName" title="Categoria" />
        <Table.Column
          dataIndex="name"
          title="Nome do evento"
          render={(value, record) => (
            <Button type="link">
              <Link to={`/app/event/${record.id}`}>{record.name}</Link>
            </Button>
          )}
        />
        <Table.Column dataIndex="start_date" title="Data de inicio" />
        <Table.Column dataIndex="end_date" title="Data de encerramento" />
        <Table.Column
          title="Times convocados"
          // eslint-disable-next-line no-underscore-dangle
          render={(value, record) => record.__meta__.teams_count}
        />
        <Table.Column
          title="Pessoas convocadas"
          // eslint-disable-next-line no-underscore-dangle
          render={(value, record) => record.__meta__.users_count}
        />

        <Table.Column
          title=""
          render={(value, record) => (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <EditEventButton id={record.id} />
                  </Menu.Item>
                  <Menu.Item>
                    <RemoveEventButton event={record} />
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type="link">
                <ToolOutlined />
              </Button>
            </Dropdown>
          )}
        />
      </Table>
    )
  }
}

EventTable.defaultProps = {
  eventsList: [],
}

EventTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  eventsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      __meta__: PropTypes.shape({
        teams_count: PropTypes.string,
        users_count: PropTypes.string,
      }),
    })
  ),
}

const mapStateToProps = state => ({
  eventsList: state.eventsList,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(EventTable)
