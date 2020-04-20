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
        margin: "auto",
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: "auto",
        margin: 5,
        fontSize: 10
    }
});

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
                    this.setState({ empList: res })
                }
            })
            .catch(err => { hideLoader(); console.log(err) })
    }

    render() {


        console.log(this.state)
        let { empList } = this.state;
        return (

            <PDFViewer className="emp-list-pdf">
                <Document title="Employee List" author="Dixant" subject="Employee Data PDF">
                    <Page size="A3" style={styles.page} wrap >
                        <Text style={styles.header}>Employee List</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Name</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Email</Text>
                                </View>
                                <View style={styles.tableColHeaderSmall}>
                                    <Text style={styles.tableCellHeader}>DOB</Text>
                                </View>
                                <View style={styles.tableColHeaderSmall}>
                                    <Text style={styles.tableCellHeader}>DOJ</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Salary</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Gender</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Role</Text>
                                </View>
                            </View>
                            {empList && empList.map((v, i) => (
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{v.name}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{v.tableEmployeeEmailAddress}</Text>
                                    </View>
                                    <View style={styles.tableColSmall}>
                                        <Text style={styles.tableCell}>{v.tableEmployeeDOB}</Text>
                                    </View>
                                    <View style={styles.tableColSmall}>
                                        <Text style={styles.tableCell}>{v.tableEmployeeDOJ}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{v.tableEmployeeSalary}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{v.tableEmployeeGender}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{v.tableEmployeeRole}</Text>
                                    </View>
                                </View>
                            ))}

                        </View>
                    </Page>
                    
                </Document>
            </PDFViewer>
        )
    }
}
export default EmployeeList;