import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tooltip, Dropdown, Menu, Button } from 'antd'

import Column from 'antd/lib/table/Column'
import { ToolOutlined } from '@ant-design/icons'
import UserAvatar from './UserAvatar'
import UserStatusTag from './UserStatusTag'
import { formatPhoneNumber, formatDateTime } from '../util/stringUtil'

import EditUserButton from './EditUserButton'
import RemoveUserButton from './RemoveUserButton'

const renderAvatar = (value, record) => (
  <Tooltip title="Ver detalhes">
    <Link to={`/app/user/${record.id}`}>
      <UserAvatar user={record} />
    </Link>
  </Tooltip>
)

const renderOptions = (value, record) => (
  <Dropdown
    overlay={
      <Menu>
        <Menu.Item>
          <EditUserButton id={record.id} />
        </Menu.Item>
        <Menu.Item>
          <RemoveUserButton user={record.id} />
        </Menu.Item>
      </Menu>
    }
  >
    <Button type="link">
      <ToolOutlined />
    </Button>
  </Dropdown>
)

const renderTag = (value, record) => <UserStatusTag user={record} />

function UsersTable({ loading, users }) {
  return (
    <Table size="small" loading={loading} dataSource={users.map(u => ({ ...u, key: u.id }))}>
      <Column title="" dataIndex="avatar" render={renderAvatar} />

      <Column
        title="Apelido"
        dataIndex="apelido"
        render={(value, record) => <Link to={`/app/user/${record.id}`}>{record.apelido}</Link>}
      />

      <Column title="Nome" dataIndex="nomeCompleto" />
      <Column title="E-mail" dataIndex="email" />
      <Column title="Telefone" dataIndex="telefone" render={formatPhoneNumber} />
      <Column title="Data Cadastro" dataIndex="created_at" render={formatDateTime} />
      <Column title="Status" dataIndex="active" render={renderTag} />
      <Column title="Opções" render={renderOptions} />
    </Table>
  )
}

const userProps = PropTypes.shape({
  id: PropTypes.number,
})

UsersTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(userProps).isRequired,
}

export default UsersTable
