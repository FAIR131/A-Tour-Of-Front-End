export default {
    initOrders: function () {
        this.$http.post("/order/getDriverOrder", this.query).then((res) => {
            this.orderData = res.data.object.list;
            this.query.total = res.data.object.total;
        });
    },
    handleSizeChange(pageSize) {
        this.query.pageSize = pageSize;
        this.initOrders();
    },
    handleCurrentChange(pageNum) {
        this.query.pageNum = pageNum;
        this.initOrders();
    },
    handleClick: function (order) {
        this.newOrder = order;
        this.$http
            .get("/driverUser/getAllDriver", {
                params: {
                    province: order.province,
                    city: order.city,
                    pageNum: 1,
                    pageSize: 10,
                },
            })
            .then((res) => {
                this.drivers = res.data.object.list;
            });

        this.$http
            .get("/testStation/getAllStation", {
                params: {
                    province: order.province,
                    city: order.city,
                    pageNum: 1,
                    pageSize: 10,
                    coordinate: order.coordinate,
                },
            })
            .then((res) => {
                this.stations = res.data.object.list;
            });

        if (
            this.newOrder.merchantLicenseImg == null ||
            this.newOrder.merchantLicenseImg == "null"
        ) {
            this.newOrder.merchantLicenseImg = [];
        } else if (typeof this.newOrder.merchantLicenseImg === "string") {
            this.newOrder.merchantLicenseImg = JSON.parse(
                this.newOrder.merchantLicenseImg
            );
        }

        this.dialogVisible = true;
    },
    changeDriver: function (driver) {
        this.newOrder.driverId = driver.id;
        this.newOrder.driverName = driver.driverName;
    },
    changeStation: function (station) {
        this.newOrder.stationId = station.id;
        this.newOrder.stationName = station.name;
    },
    updateOrder: function () {
        let tmpOrder = JSON.parse(JSON.stringify(this.newOrder));

        tmpOrder.merchantLicenseImg = JSON.stringify(tmpOrder.merchantLicenseImg);

        this.$http.post("/order/updateDriverOrder", tmpOrder).then((res) => {
            this.$message.success("订单修改成功");
            this.dialogVisible = false;
        });
    },
    uploadImg: function (res) {
        this.newOrder.merchantLicenseImg.push(res.object.url);
    },
    searchStation: function (stationName, cb) {
        this.$http
            .get("/testStation/getAllStation", {
                params: {
                    stationName,
                    pageNum: 1,
                    pageSize: 10,
                },
            })
            .then((res) => {
                let result = [];
                res.data.object.list.forEach((item) => {
                    result.push({ value: item.name, id: item.id });
                });
                cb(result);
            });
    },
    findByStation: function (item) {
        this.query.stationName = item.value;
        this.query.stationId = item.id;
        this.initOrders();
    },
    searchDriver: function (driverName, cb) {
        this.$http
            .get("/driverUser/getAllDriver", {
                params: {
                    pageNum: 1,
                    pageSize: 10,
                    driverName,
                },
            })
            .then((res) => {
                let result = [];
                res.data.object.list.forEach((item) => {
                    result.push({ value: item.driverName, id: item.id });
                });
                cb(result);
            });
    },
    findByDriver: function (item) {
        this.query.driverName = item.value;
        this.query.driverId = item.id;
        this.initOrders();
    },
    getSite: function (prov, city, area) {
        this.query.province = prov;
        this.query.city = city;
        this.query.area = area;
        this.initOrders();
    },
    getOrderDetail: function (row, expandRows) {
        if (expandRows.length > 0) {
            this.expandRow = [row.id];
            this.$http
                .get("/order/getOrderDetail", {
                    params: {
                        id: row.id,
                    },
                })
                .then((res) => {
                    this.orderService = res.data.object;
                });
        }else{
            this.expandRow = [];
        }
    }
}