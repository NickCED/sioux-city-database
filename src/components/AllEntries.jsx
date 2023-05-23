import {
  SliderField,
  Button,
  Flex,
  Text,
  Tabs,
  TabItem,
  SwitchField,
} from '@aws-amplify/ui-react';
import React from 'react';
import { API } from 'aws-amplify';
import { useTable, useSortBy, useFilters } from 'react-table';
import { useState, useEffect } from 'react';
import {
  IoPencilOutline,
  IoCloseOutline,
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoEyeOutline,
} from 'react-icons/io5';
import {
  listVenues,
  listHallOfFames,
  listProfessionalTeams,
  listSchoolSports,
  listSchools,
  listProfessionalSports,
} from '../graphql/queries';
// import { deleteImages } from './SaveImage';
// import * as queries from '../graphql/queries';
// import * as mutations from '../graphql/mutations';
// import * as subscriptions from '../graphql/subscriptions';
import { useEntrySubscriptions } from './useEntrySubscriptions';
import { handleKioskReady } from './AllEntries/handleKioskReady';

import { useProfessionalSportSubscriptions } from './useProfessionalSportSubscriptions';
import { handleDeleteEntry } from './handleDeleteEntry';
import './AllEntries.css';

import ShowSchools from './ShowSchools.jsx';
import ShowProfessionalSports from './ShowProfessionalSports';

export default function AllEntries(props) {
  const { data, setData } = useEntrySubscriptions();
  const [rowHeight, setRowHeight] = useState(18);
  const [selectedTab, setSelectedTab] = useState('Entries');

  useEffect(() => {
    if (selectedTab === 'Entries') {
      setFilter('name', props.searchText);
    }
  }, [props.searchText]);

  const handleViewEntry = (entry) => {
    props.onViewEntry(entry);
  };

  const handleEditEntry = (entry) => {
    props.onEditEntry(entry);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab !== 'Entries') {
      props.onTabChange(true);
    }
    if (tab === 'Entries') {
      props.onTabChange(false);
    }
  };

  const handleRowHeightChange = (value) => {
    setRowHeight(value);
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const queries = [
        listVenues,
        listHallOfFames,
        listProfessionalTeams,
        listSchoolSports,
      ];
      const results = await Promise.all(
        queries.map((query) => API.graphql({ query }))
      );

      const combinedData = results.flatMap(
        (result) => result.data[Object.keys(result.data)[0]].items
      );
      setData(combinedData);
    };

    fetchEntries();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        id: 'rowNumber',
        disableSortBy: true,
        disableFilters: true,
        width: '1vw',
        Cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        Header: 'Name',
        accessor: 'name',
        maxWidth: '40vw',
        width: '40vw',
      },
      {
        Header: 'Entry Type',
        accessor: 'entryType',
        maxWidth: '20vw',
        width: '20vw',
        textAlign: 'center',
      },
      {
        Header: 'Created/Updated By',
        accessor: 'createdBy',
        width: '20vw',
        minWidth: '185px',
        textAlign: 'center',
      },
      {
        Header: 'Kiosk Ready',
        accessor: 'kioskReady',
        width: '10vw',
        minWidth: '100px',
        textAlign: 'center',
        Cell: ({ row }) => (
          <SwitchField
            label='Kiosk Ready'
            isDisabled={false}
            defaultChecked={row.original.kioskReady}
            isLabelHidden={true}
            onChange={(e) => {
              console.log('kiosk ready', e.target.checked);
              handleKioskReady(e, row.original);
            }}
          />
        ),
      },
      {
        Header: 'View',
        textAlign: 'center',
        minWidth: '70px',
        Cell: ({ row }) => (
          <Button border={'none'} onClick={() => handleViewEntry(row.original)}>
            <IoEyeOutline size={rowHeight} />
          </Button>
        ),
      },

      {
        Header: 'Edit',
        textAlign: 'center',
        minWidth: '70px',
        Cell: ({ row }) => {
          return (
            <Button
              border={'none'}
              disabled={false}
              onClick={() => handleEditEntry(row.original)}
            >
              <IoPencilOutline size={rowHeight} />
            </Button>
          );
        },
      },
      {
        Header: 'Delete',
        textAlign: 'center',
        minWidth: '70px',
        Cell: ({ row }) => {
          const [deleteLoading, setDeleteLoading] = useState(false);
          const confirmDelete = (e, entry) => {
            console.log('confirm delete');
            if (window.confirm('Are you sure you want to delete this entry?')) {
              setDeleteLoading(true);
              handleDeleteEntry(entry);
            }
          };
          return (
            <Button
              border={'none'}
              id={row.original.id + 'button'}
              isLoading={deleteLoading}
              onClick={(e) => confirmDelete(e, row.original)}
            >
              <IoCloseOutline size={rowHeight} />
            </Button>
          );
        },
      },
    ],
    [props, rowHeight]
  );
  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setFilter,
  } = tableInstance;

  return (
    <Flex direction={'column'} flex={'1 1 auto'} overflow={'hidden'}>
      <Flex>
        <Tabs>
          <TabItem
            title='Entries'
            onClick={() => handleTabChange('Entries')}
          ></TabItem>
          <TabItem
            title='Schools'
            onClick={() => handleTabChange('Schools')}
          ></TabItem>
          <TabItem
            title='Professional Sports'
            onClick={() => handleTabChange('Professional Sports')}
          ></TabItem>
        </Tabs>
        {selectedTab === 'Entries' && (
          <Flex
            direction='row'
            alignItems={'center'}
            justifyContent={'flex-end'}
            marginLeft={'1em'}
            gap={0}
          >
            <Text fontSize='.85em'>Text Size</Text>
            <SliderField
              size='small'
              label='Row Height'
              value={rowHeight}
              isValueHidden={true}
              labelHidden={true}
              style={{ marginLeft: '20px' }}
              min={10}
              max={32}
              onChange={handleRowHeightChange}
            />
          </Flex>
        )}
      </Flex>
      {selectedTab === 'Entries' && (
        <div
          className='table-wrapper'
          style={{
            flex: '1 1 auto',
            overflowY: 'scroll',
          }}
        >
          <table
            {...getTableProps}
            style={{
              borderCollapse: 'collapse',
            }}
          >
            <thead
              style={{
                background: 'rgb(176 227 237 / 52%)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: '0',
                borderCollapse: 'separate',
                borderSpacing: '0 5px',
              }}
            >
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps({
                        ...column.getSortByToggleProps(),
                        style: {
                          width: column.width,
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,

                          textAlign: column.textAlign,
                        },
                      })}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <IoArrowDownOutline
                              style={{
                                marginLeft: '5px',
                              }}
                            />
                          ) : (
                            <IoArrowUpOutline
                              style={{
                                marginLeft: '5px',
                              }}
                            />
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps}
              style={{
                borderCollapse: 'collapse',
              }}
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps({
                      className: 'entries-tr',
                      style: {
                        borderCollapse: 'collapse',
                        height: `${rowHeight}px`,
                      },
                    })}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <th
                          {...cell.getCellProps({
                            className: 'entries-th',
                            style: {
                              width: cell.column.width,
                              minWidth: cell.column.minWidth,
                              maxWidth: cell.column.maxWidth,
                              padding: '0 {{theme.space[2]}}',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',

                              textAlign: cell.column.textAlign,
                              fontSize: `${rowHeight}px`,
                              fontWeight: '500',
                            },
                          })}
                        >
                          {cell.render('Cell')}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {selectedTab === 'Schools' && (
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
          }}
        >
          <ShowSchools
            schoolData={props.schoolData}
            highSchoolData={props.highSchoolData}
            collegeData={props.collegeData}
            onEditSchool={(school) => props.onEditSchool(school)}
          />
        </div>
      )}
      {selectedTab === 'Professional Sports' && (
        <div
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
          }}
        >
          <ShowProfessionalSports
            data={[...props.professionalData, ...props.clubData]}
            onEditProfessionalSport={(sport) =>
              props.onEditProfessionalSport(sport)
            }
          />
        </div>
      )}
    </Flex>
  );
}
