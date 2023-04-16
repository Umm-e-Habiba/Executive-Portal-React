import React from 'react';
import { Input, Row, Col, } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

const SelectableTable = (props) => {
    const { onSelect, onSelectAll } = props;

    const expandRow = {
        renderer: props.expandRenderer,
        showExpandColumn: true,
        onlyOneExpanding: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            return isAnyExpands ? <i className='uil uil-minus'></i> : <i className='uil uil-plus'></i>;
        },
        expandColumnRenderer: ({ expanded }) => {
            return expanded ? <i className='uil uil-minus'></i> : <i className='uil uil-plus'></i>;
        },
    };

    const paginationOptions = {
        paginationSize: 5,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total ml-4">
                Showing {from.toLocaleString()} to {to.toLocaleString()} of {size.toLocaleString()} Results
            </span>
        ),
        sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
            <React.Fragment>
                <label className="d-inline mr-1">Show</label>
                <Input type="select" name="select" id="no-entries" className="custom-select custom-select-sm d-inline col-1"
                    defaultValue={currSizePerPage}
                    onChange={(e) => onSizePerPageChange(e.target.value)}>
                    {options.map((option, idx) => {
                        return <option key={idx}>{option.text}</option>
                    })}
                </Input>
                <label className="d-inline ml-1">entries</label>
            </React.Fragment>
        ),
        sizePerPageList: [
            {
                text: '5',
                value: 5,
            },
            {
                text: '10',
                value: 10,
            },
            {
                text: '25',
                value: 25,
            },
        ],
    };

    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    return <ToolkitProvider
                bootstrap4
                keyField="RowNumber"
                data={props.records}
                columns={props.columns}
                search
                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                {props => (
                    <React.Fragment>
                        <Row>
                            <Col>
                                <SearchBar {...props.searchProps} />
                            </Col>
                            <Col className="text-right">
                                <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                                    Export CSV
                                </ExportCSVButton>
                            </Col>
                        </Row>

                        <BootstrapTable
                            {...props.baseProps}
                            pagination={paginationFactory(paginationOptions)}
                            expandRow={expandRow}
                            selectRow={{
                                mode: 'checkbox',
                                clickToSelect: true,
                                style: { backgroundColor: '#727cf5', color: '#fff' },
                                onSelect: (row, isSelected, rowIndex, e) => onSelect(isSelected, row), 
                                onSelectAll: (isSelected, rows, e) => onSelectAll(isSelected, rows),
                            }}
                            wrapperClasses="table-responsive"
                        />
                    </React.Fragment>
                )}
            </ToolkitProvider>;
};

export default SelectableTable;