Template.Mosquefinance.rendered = function() {
    $('.top_title').html('Finances');
    $('#page_title').html('Finances');
};

//MOVED THIS OUTSIDE OF THE RENDERED FUNCTION TO KEEP SCOPE ACROSS ALL TEMPLATES
//1.0.2 blaze changed Rendered to be called less so it doesn't work when placed
//inside scope

//Format a Mongo query into the same format as a Mongo aggregate
//because meteor apparently can't do that
var groupTransByDate = function(trans, type) {
    trans = trans || [];
    var groupedTrans = [];
    trans.forEach(function(tran) {
        var eDate = moment(tran.date);
        var eYear = eDate.format('YYYY');
        var eMonth = eDate.format('M');
        var found = false;
        for (var i = 0; i < groupedTrans.length; i++) {
            if (groupedTrans[i]._id.year == eYear &&
                groupedTrans[i]._id.month == eMonth) {
                groupedTrans[i].total += parseFloat(tran.amount);
                found = true;
                break;
            }
        }

        if (!found) {
            groupedTrans.push(
                {_id: {month: eMonth,
                       year: eYear},
                 total: parseFloat(tran.amount)}
            );
        }
    });

    return {trans: groupedTrans, type: type};
};

Template.chart.created = function() {
    //mosqueid = Meteor.user().profile.manager;
    //finance = MosqueFinances.find({manager: mosqueid}).fetch();
    function updateGraph(){
        if(nv.graphs.length > 0){
            d3.select('#chart1 svg')
                .datum(cumulativeTestData())
                .call(nv.graphs[0]);
            nv.graphs[0].update();
        }
    };

    MosqueFinances.find({}).observeChanges({
        added: updateGraph,
        removed: updateGraph,
        changed: updateGraph
    });

    function cumulativeTestData() {
    finance = MosqueFinances.find({},{sort: {date: 1}}).fetch();
    var chart_values = {
        income: [],
        expense: [],
        transfer: [],
        net: []
    };

    var c3_values = {
        income: [[],[]],
        expense: [[],[]],
        transfer: [[],[]],
        net: [[],[]]
    };

    var opmap = {
        income: function(v1, v2) {return v1 + v2;},
        expense: function(v1, v2) {return v1 - v2;},
        transfer: function(v1, v2) {return v1 + v2;}
    };
    for (var k = 0; k < finance.length; k++) {
        if (k == '0') {
            j = 1389416400000;
            var financevalue = [finance[k]['date'], 0];
            chart_values.income.push(financevalue);
            chart_values.expense.push(financevalue);
            chart_values.transfer.push(financevalue);
            chart_values.net.push(financevalue);
            //WTF, seriously
            p = j;
            t = j;
            j = j + 2678400000;
            p = p + 2678400000;
            t = t + 2678400000;
        }
        var check_same_date = 1;
        var replaced_value = false;

        var cur_type = finance[k]['type'];

        while (k - check_same_date >= 0 &&
               +finance[k]['date'] == +finance[k - check_same_date]['date']) {

            if (cur_type ==
                finance[k - check_same_date]['type']) {
                var addresult = parseFloat(finance[k - check_same_date]['amount']) + parseFloat(finance[k]['amount']);
                finance[k - check_same_date]['amount'] = addresult;

                last_chart_index = chart_values[cur_type].length - 1;

                var currentnet = chart_values.net[chart_values.net.length - 1][1];
                c3_values.net[1][chart_values.net.length - 1] =
                    opmap[cur_type](currentnet,
                                    parseFloat(finance[k]['amount']));

                chart_values.net[chart_values.net.length - 1][1] =
                    opmap[cur_type](currentnet,
                                    parseFloat(finance[k]['amount']));

                c3_values[cur_type][1][last_chart_index] =
                    finance[k - check_same_date]['amount'];

                chart_values[cur_type][last_chart_index][1] =
                    finance[k - check_same_date]['amount'];
                replaced_value = true;
            }
            check_same_date++;
        }
        if (!replaced_value) {
            var financevalue = [finance[k]['date'], finance[k]['amount']];
            chart_values[finance[k]['type']].push(financevalue);
            c3_values[finance[k]['type']][0].push(finance[k]['date']);
            c3_values[finance[k]['type']][1].push(finance[k]['amount']);

            var currentnet = chart_values.net[chart_values.net.length - 1][1];
            chart_values.net.push([finance[k]['date'],
                                   opmap[cur_type](currentnet,
                                                   parseFloat(finance[k]['amount']))]);

            c3_values.net[0].push(finance[k]['date']);
            c3_values.net[0].push(
                opmap[cur_type](currentnet,
                                parseFloat(finance[k]['amount'])));
        }
    }



        return [
            {
                key: 'income',
                values: chart_values.income
            },
            {
                key: 'expense',
                values: chart_values.expense
            },
            /*{ TODO: re-enable if we need to track transfers
                key: 'transfer',
                values: chart_values.transfer
            },*/
            {
                key: 'net',
                values: chart_values.net
            }
        ];


        /*
          .map(function(line) {
          line.values = line.values.map(function(d) { return {x: d[0], y: d[1]/100  }});
          return line;
          });
        */
    }
    /*
    var chart = c3.generate({
        data: {
            xs: {
                'income': 'incomex',
                'expense': 'expensex',
                'net': 'netx'
            },
            columns: [
                ['incomex'].concat(c3_values.income[0]),
                ['expensex'].concat(c3_values.expense[0]),
                ['netx'].concat(c3_values.net[0]),
                ['income'].concat(c3_values.income[1]),
                ['expense'].concat(c3_values.expense[1]),
                ['net'].concat(c3_values.net[1])
            ]
        }
    });
    */

    var chart = nv.models.lineChart()
        //.useInteractiveGuideline(true)
        .x(function(d) { return d[0] })
        .y(function(d) { return d[1] / 1 })
        .color(d3.scale.category10().range())
        //    .transitionDuration(10)
    //

    nv.addGraph(function() {

        chart.xAxis
            .rotateLabels(-25)
            .tickFormat(function(d) {
                formatted = moment(d).format('YYYY/MM/DD');
                return formatted;
            });

        chart.yAxis
            .tickFormat(
                d3.format(',.2f'));

        //console.log('Chart render from here');
        d3.select('#chart1 svg')
            .datum(cumulativeTestData())
            .call(chart);

        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);

        /*
          chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        //console.log('dfd', d.mean / 100); */
        return chart;
    });
};



Template.financehtml.helpers({
    thisMonthFormatted: function() {
        return moment().format('MMMM YYYY');
    },
    thisMonth: function() {
        return moment().format('M');
    },
    thisYear: function() {
        return moment().format('YYYY');
    },
    transactionForMonth: function(transactions, month, year) {
        /*console.log(month);
          console.log(year);
          console.log(transactions);*/
        var result = 0;
        transactions.trans.forEach(function(group) {
            if (group._id.month == month && group._id.year == year) {
                result = group.total;
            }
        });
        Session.set(transactions.type, result);
        return result;
    },
    donationsAllTime: function() {
        var result = 0;
        MosqueFinances.find({category:'donation'})
            .fetch().forEach(function(d){
                result += d.amount;
            });
        return result;
    },
    donationsForMonth: function() {
        var result = 0;
        var month_start = new Date();
        month_start.setDate(1);
        var month_end = new Date();
        month_end.setMonth(month_start.getMonth()+1);
        month_end.setDate(1);
        MosqueFinances.find({category:'donation',
            date:{$gt:month_start,$lt:month_end}})
            .fetch().forEach(function(d){
                result += d.amount;
            });
        return result;
    },
    donationData: function(){
        Meteor.call('normFinanceCalc',Mosques.findOne()._id,{},function(e,result){

            data = [
                {
                    key:'donations',
                    values: []
                }
            ]
            result.forEach(function(doc){
                data[0].values.push([doc.date,doc.total]);
            });

            Session.set('donationData',data);
        });

        return 'donationData'//||[]//[{key:'empty',values:[[],[]]}];

    },
    totalIncome: function() {
        var income = MosqueFinances.find({type: 'income'});
        return groupTransByDate(income, 'income');
        //Ideal implementation with Mongo Aggregations
        /*return MosqueFinances.find({type: 'income'}).aggregate([
          {
          $group:
          {
          _id: {month: {$month: '$date'},
          year: {$year: '$date'}},
          total: {$sum: 'amount'}
          }
          }
          ]);*/
    },
    totalExpenses: function() {
        var expenses = MosqueFinances.find({type: 'expense'});
        return groupTransByDate(expenses, 'expense');
        //Ideal implementation with Mongo aggregations
        /*return MosqueFinances.find({type: 'expense'}).aggregate([
          {
          $group:
          {
          _id: {month: {$month: '$date'},
          year: {$year: '$date'}},
          total: {$sum: 'amount'}
          }
          }
          ]);*/
    },
    allTimeBalance: function() {
        var expenses = MosqueFinances.find({type: 'expense'});
        var income = MosqueFinances.find({type: 'income'});

        var totalIncome = 0;
        var totalExpenses = 0;

        expenses.forEach(function(expense) {
            totalExpenses += parseFloat(expense.amount);
        });

        income.forEach(function(income) {
            totalIncome += parseFloat(income.amount);
        });

        return totalIncome - totalExpenses;
    },
    monthlyBalance: function(totalIncome, totalExpenses) {
        return Session.get('income') - Session.get('expense');
    },
    transaction: function(type) {
        if (type == 'all') {
            transactions = MosqueFinances.find({},{sort:{date:-1}});
        } else if (type == 'donation') {
            transactions = MosqueFinances.find({category: 'donation'},{sort:{date:-1}});
        } else {
            transactions = MosqueFinances.find({type: type},{sort:{date:-1}});
        }
        return transactions;
    }
});

Template.transactionRow.helpers({
    formatdate: function(date) {
        return moment(date).format('YYYY-MM-DD');
    },
    typecast: function(trans) {
        if (trans.type == 'income' || trans.type == 'donation') {
            return '+';
        } else {
            return '-';
        }
    }
});

Template.donationRow.helpers({
    formatdate: function(date) {
        return moment(date).format('YYYY-MM-DD');
    }
})

Template.IncomeForm.rendered = function() {
    var dpick = new Pikaday({field: $('#date')[0]});
};

Template.ExpensesForm.rendered = function() {
    var dpick = new Pikaday({field: $('#exdate')[0]});
};

Template.TransferForm.rendered = function() {
    var dpick = new Pikaday({field: $('#transdate')[0]});
};


Template.IncomeForm.events({
    'click #add': function(evt, tmpl) {

        var values = {};
        values.type = 'income';
        values.amount = parseFloat(tmpl.find('#amount').value);
        if (!values.amount || 0 > values.amount || typeof(values.amount) != typeof(1.0)) {
            alert('Please input a positive amount');
            return;
        }
        values.description = tmpl.find('#description').value;
        values.category = tmpl.find('#category').value;
        //values.account = tmpl.find('#account').value;
        values.date = new Date(tmpl.find('#date').value);
        if(!tmpl.find('#date').value){
            alert('Please input a date');
            return;
        }
        //Revert to old method. We need to keep track of the MOSQUE id
        //the data labels you use in the user profile does not make sense
        managed_mosque = Mosques.findOne({managers: Meteor.userId()},{});
        //managed_mosque = Meteor.userId() && Meteor.user() && Meteor.user().profile ? Meteor.user().profile.manager : '';
        //values.manager = managed_mosque;
        values.mosque_id = managed_mosque._id;

        MosqueFinances.insert(values);
        $('.btn-cancel').click();
        $('input').val('');
    }
});

Template.ExpensesForm.events({
    'click #add': function(evt, tmpl) {

        var values = {};

        values.type = 'expense';
        values.amount = parseFloat(tmpl.find('#examount').value);
        if (!values.amount || 0 > values.amount || typeof(values.amount) != typeof(1.0)) {
            alert('Please input a positive amount');
            return;
        }
        values.description = tmpl.find('#exdescription').value;
        values.category = tmpl.find('#excategory').value;
        //values.account = tmpl.find('#exaccount').value;
        if(!tmpl.find('#exdate').value){
            alert('Please input a date');
            return;
        }
        values.date = new Date(tmpl.find('#exdate').value);
        managed_mosque = Mosques.findOne({managers: Meteor.userId()},{});
        values.mosque_id = managed_mosque._id;

        MosqueFinances.insert(values);
        $('.btn-cancel').click();
        $('input').val('');
    }
});

Template.TransferForm.events({
    'click #add': function(evt, tmpl) {

        var values = {};

        values.type = 'transfer';
        values.amount = parseFloat(tmpl.find('#transamount').value);

        if (0 > values.amount) {
            alert('Please input a positive amount');
        }
        values.description = tmpl.find('#transdescription').value;
        values.category = tmpl.find('#transcategory').value;
        values.accountto = tmpl.find('#transto').value;
        values.accountfrom = tmpl.find('#transfrom').value;
        values.date = new Date(tmpl.find('#transdate').value);

        managed_mosque = Mosques.findOne({managers: Meteor.userId()},{});
        values.mosque_id = managed_mosque._id;
        MosqueFinances.insert(values);
        $('.btn-cancel').click();
        $('input').val('');
    }
});


Template.transactionRow.events({
    'click #delete': function(evt, tmpl) {
        MosqueFinances.remove({_id: this._id});
    }
});
