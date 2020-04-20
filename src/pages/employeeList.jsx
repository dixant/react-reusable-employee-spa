import React from 'react';
import { showLoader, hideLoader } from '../components/Loader';
import { Document, Page, Text, View, PDFViewer, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    document: {
        width: 100,
        height: 100
    },
    page: {
        backgroundColor: '#ffffff',
        width: 100,
        height: 100,
        padding: 10
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        fontSize: 22,
        textAlign: "center",
        padding: 10
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: "15%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeaderSmall: {
        width: "12%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        width: "15%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },

    tableColSmall: {
        width: "12%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    }
});

const GetColumns = ({ columns }) => {
    return (
        columns.map((itm) => (
            <View key={itm.name} style={itm.viewStyle}>
                <Text style={itm.textStyle}>{itm.name}</Text>
            </View>
        ))
    );
}

const GetTableTD = ({ data, columns }) => {
    return (
        Object.entries(data).map((v, i) => (
            v[0] !== 'idtableEmployeeId' ?
                <View style={columns[i - 1].viewStyle}>
                    <Text style={columns[i - 1].textStyle}>{v[1]}</Text>
                </View>
                : null
        ))
    )
}
const getPdfPage = ({ heading, chunkData, detail }) => {
    console.log("chunkData: ", chunkData);
    return (
        <Page size="A3" style={styles.page} wrap >
            <Text style={styles.header}>Employee List</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <GetColumns columns={heading}></GetColumns>
                </View>
                {chunkData.map((v, i) => (
                    <View style={styles.tableRow}>
                        <GetTableTD columns={detail} data={v}></GetTableTD>
                    </View>
                ))}
            </View>
        </Page>
    );
}
class EmployeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empList: []
        }
    }
    componentDidMount() {
        let loginId = sessionStorage.getItem("loginId");
        let request = {
            method: 'GET',
            headers: new Headers({
                clientId: 175,
                userid: loginId
            })
        }
        showLoader();
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/employee/", request)
            .then(res => res.json())
            .then(res => {
                hideLoader();
                if (res !== undefined && res !== null && res !== '') {
                    this.setState({ empList: [...res] })
                }
            })
            .catch(err => { hideLoader(); console.log(err) })
    }
    getPages() {
        let { empList } = this.state;
        if (empList.length) {
            let limit = 40;
            let totalPages = parseInt(empList.length / limit) + (empList.length % limit > 0);
            let pageData = [];
            for (let i = 0; i < totalPages; i++) {
                let start = limit * i,
                    end = empList.length > limit ? (start + limit) : empList.length;
                let chunkData = empList.slice(start, end);
                let { tableColHeader, tableColHeaderSmall, tableCellHeader, tableCol, tableColSmall, tableCell } = styles;
                const heading = [
                    { name: 'Name', viewStyle: tableColHeader, textStyle: tableCellHeader },
                    { name: 'Email', viewStyle: tableColHeader, textStyle: tableCellHeader },
                    { name: 'DOB', viewStyle: tableColHeaderSmall, textStyle: tableCellHeader },
                    { name: 'DOJ', viewStyle: tableColHeaderSmall, textStyle: tableCellHeader },
                    { name: 'Salary', viewStyle: tableColHeader, textStyle: tableCellHeader },
                    { name: 'Gender', viewStyle: tableColHeader, textStyle: tableCellHeader },
                    { name: 'Role', viewStyle: tableColHeader, textStyle: tableCellHeader }];
                const detail = [
                    { viewStyle: tableCol, textStyle: tableCell },
                    { viewStyle: tableCol, textStyle: tableCell },
                    { viewStyle: tableColSmall, textStyle: tableCell },
                    { viewStyle: tableColSmall, textStyle: tableCell },
                    { viewStyle: tableCol, textStyle: tableCell },
                    { viewStyle: tableCol, textStyle: tableCell },
                    { viewStyle: tableCol, textStyle: tableCell }];
                pageData.push(getPdfPage({ heading, chunkData, detail }))
            }
            return pageData;
        }
        return null;
    }
    render() {
        return (

            <PDFViewer className="emp-list-pdf">
                <Document title="Employee List" author="Dixant" subject="Employee Data PDF">
                    {this.getPages()}
                </Document>
            </PDFViewer>
        )
    }
}
export default EmployeeList;