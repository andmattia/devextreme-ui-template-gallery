import React from 'react';
import classNames from 'classnames';

import Form, { SimpleItem, GroupItem, ColCountByScreen } from 'devextreme-react/form';

import SelectBox from 'devextreme-react/select-box';
import TextArea from 'devextreme-react/text-area';

import { FormTextbox } from '../../utils/form-textbox/FormTextbox';
import { FormDateBox } from '../../utils/form-datebox/FormDateBox';

import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../../shared/constants';
import { editFieldRender, statusItemRender, priorityFieldRender, priorityItemRender } from '../../../shared/statusIndicatorRenderMethods';

import { Task } from '../../../types/task';
import './TaskFormDetails.scss';
import { getSizeQualifier } from '../../../utils/media-query';

export const TaskFormDetails = ({ editing, data, subjectField, onDataChanged }: {
  editing: boolean, data: Task, subjectField: boolean, onDataChanged: (data) => void
}) => {
  const updateField = (field: string) => (value: string) => {
    onDataChanged((prevState) => ({ ...prevState, ...{ [field]: value } }));
  };

  return (
    <Form
      className={classNames({ 'plain-styled-form task-form-details': true, 'view-mode': !editing })}
      screenByWidth={getSizeQualifier}
    >
      {subjectField && <SimpleItem colSpan={2}>
        <FormTextbox
          label='Subject'
          value={data.text}
          isEditing={!editing}
          onValueChange={updateField('text')}
        />
      </SimpleItem>}
      <GroupItem itemType='group'>
        <ColCountByScreen xs={1} sm={2} md={2} lg={2} />
        <SimpleItem cssClass='accent'>
          <FormTextbox
            label='Company'
            value={data.company}
            isEditing={!editing}
            onValueChange={updateField('company')}
          />
        </SimpleItem>
        <SimpleItem cssClass='accent'>
          <FormTextbox
            label='Assigned to'
            value={data.owner}
            isEditing={!editing}
            onValueChange={updateField('owner')}
          />
        </SimpleItem>
        <SimpleItem>
          <SelectBox
            label='Priority'
            value={data.priority}
            items={PRIORITY_ITEMS}
            readOnly={!editing}
            stylingMode='filled'
            fieldRender={priorityFieldRender}
            itemRender={priorityItemRender}
            onValueChange={updateField('priority')}
          />
        </SimpleItem>
        <SimpleItem>
          <SelectBox
            label='Status'
            value={data.status}
            items={STATUS_ITEMS}
            readOnly={!editing}
            stylingMode='filled'
            fieldRender={editFieldRender}
            itemRender={statusItemRender}
            onValueChange={updateField('status')}
          />
        </SimpleItem>
        <SimpleItem>
          <FormDateBox
            value={data.startDate}
            readOnly={!editing}
            name='Set Start Date'
            label='Start Date'
            onValueChange={updateField('startDate')}
          />
        </SimpleItem>
        <SimpleItem>
          <FormDateBox
            value={data.dueDate}
            readOnly={!editing}
            name='Set Due Date'
            label='Due Date'
            onValueChange={updateField('dueDate')}
          />
        </SimpleItem>
      </GroupItem>

      <SimpleItem colSpan={2}>
        <TextArea
          label='Details'
          readOnly={!editing}
          value={data.description}
          stylingMode='filled'
          onValueChange={updateField('description')}
        />
      </SimpleItem>
    </Form>
  );
};
