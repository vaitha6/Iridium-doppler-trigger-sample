let activeCoverageCircle = null;
let activeDopplerCircle = null;

const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample TLEs for a few Iridium satellites (you can expand this list)
const iridiumTLEs = [{
    "type": "Iridium",
    "name": "IRIDIUM 7",
    "tle1": "1 24793U 97020B   25218.90753335  .00000311  00000+0  10050-3 0  9999",
    "tle2": "2 24793  86.4018 155.6775 0002033  79.3501 280.7925 14.35969961479177",
    "timestamp": 1754547907,
    "satNb": 7,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-05-05",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 5",
    "tle1": "1 24795U 97020D   25218.92728638  .00002650  00000+0  21552-3 0  9998",
    "tle2": "2 24795  86.3846  60.3162 0106395 317.1605  42.1368 14.94711746493047",
    "timestamp": 1754547907,
    "satNb": 5,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-05-05",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 4",
    "tle1": "1 24796U 97020E   25218.85917005  .00000294  00000+0  92844-4 0  9994",
    "tle2": "2 24796  86.4013 152.5450 0002232  81.8747 278.2704 14.36870879479742",
    "timestamp": 1754547907,
    "satNb": 4,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-05-05",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 914",
    "tle1": "1 24836U 97030A   25218.92884120  .00000363  00000+0  10700-3 0  9996",
    "tle2": "2 24836  86.3994 160.9596 0003704  72.1551 288.0052 14.40907949614435",
    "timestamp": 1754547907,
    "satNb": 914,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-06-18",
    "launchvehicle": "Proton-K\/17S40",
    "launchsite": "Baikonur"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 16",
    "tle1": "1 24841U 97030F   25218.89533100  .00000323  00000+0  98813-4 0  9995",
    "tle2": "2 24841  86.4076 183.9847 0000325 161.7411 198.3799 14.38744220474290",
    "timestamp": 1754547907,
    "satNb": 16,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-06-18",
    "launchvehicle": "Proton-K\/17S40",
    "launchsite": "Baikonur"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 911",
    "tle1": "1 24842U 97030G   25218.92058322  .00000509  00000+0  13250-3 0  9995",
    "tle2": "2 24842  86.4501 182.6901 0012032 292.7260  67.2671 14.47686148482427",
    "timestamp": 1754547907,
    "satNb": 911,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-06-18",
    "launchvehicle": "Proton-K\/17S40",
    "launchsite": "Baikonur"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 17",
    "tle1": "1 24870U 97034B   25218.91376034  .00000359  00000+0  11260-3 0  9994",
    "tle2": "2 24870  86.3954 213.4222 0002027 134.3081 225.8283 14.37860701470878",
    "timestamp": 1754547907,
    "satNb": 17,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-07-09",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 920",
    "tle1": "1 24871U 97034C   25218.89563780  .00000387  00000+0  11304-3 0  9998",
    "tle2": "2 24871  86.4004 192.5581 0009293 276.1973  83.8169 14.41567966473889",
    "timestamp": 1754547907,
    "satNb": 920,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-07-09",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 26",
    "tle1": "1 24903U 97043A   25218.87364477  .00000275  00000+0  85697-4 0  9997",
    "tle2": "2 24903  86.3922  89.3251 0001948  85.4617 274.6803 14.37176203464021",
    "timestamp": 1754547907,
    "satNb": 26,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-08-21",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 22",
    "tle1": "1 24907U 97043E   25218.77573619  .00000288  00000+0  92424-4 0  9990",
    "tle2": "2 24907  86.3929  92.9514 0002077  88.7994 271.3441 14.35985304464033",
    "timestamp": 1754547907,
    "satNb": 22,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-08-21",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "DUMMY MASS 1",
    "tle1": "1 24925U 97048A   25218.95494561  .00000352  00000+0  36162-4 0  9992",
    "tle2": "2 24925  86.3346 111.8613 0005690 347.7919  12.3167 14.87021272512670",
    "timestamp": 1754547907,
    "satNb": 0,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-09-01",
    "launchvehicle": "Chang Zheng 2C-III\/SD",
    "launchsite": "Taiyuan"
}, {
    "type": "Iridium",
    "name": "DUMMY MASS 2",
    "tle1": "1 24926U 97048B   25218.79094654  .00000320  00000+0  32743-4 0  9990",
    "tle2": "2 24926  86.3349 113.5543 0006963 358.3099   1.8101 14.86773002512424",
    "timestamp": 1754547907,
    "satNb": 0,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-09-01",
    "launchvehicle": "Chang Zheng 2C-III\/SD",
    "launchsite": "Taiyuan"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 29",
    "tle1": "1 24944U 97051A   25218.85027559  .00000332  00000+0  10648-3 0  9993",
    "tle2": "2 24944  86.3974 122.6567 0002373  87.4625 272.6844 14.36502303460547",
    "timestamp": 1754547907,
    "satNb": 29,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-09-14",
    "launchvehicle": "Proton-K\/17S40",
    "launchsite": "Baikonur"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 33",
    "tle1": "1 24946U 97051C   25218.81802953  .00000256  00000+0  83075-4 0  9990",
    "tle2": "2 24946  86.3890 121.9347 0005698 276.2835  83.7712 14.34919113460003",
    "timestamp": 1754547907,
    "satNb": 33,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-09-14",
    "launchvehicle": "Proton-K\/17S40",
    "launchsite": "Baikonur"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 28",
    "tle1": "1 24948U 97051E   25218.79179860  .00000245  00000+0  75235-4 0  9990",
    "tle2": "2 24948  86.3975 120.1679 0001683  81.2608 278.8780 14.37415113461119",
    "timestamp": 1754547907,
    "satNb": 28,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-09-14",
    "launchvehicle": "Proton-K\/17S40",
    "launchsite": "Baikonur"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 36",
    "tle1": "1 24967U 97056C   25218.88642693  .00000292  00000+0  90857-4 0  9994",
    "tle2": "2 24967  86.4021 151.7192 0002070  91.0046 269.1389 14.37642492459509",
    "timestamp": 1754547907,
    "satNb": 36,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-09-27",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 39",
    "tle1": "1 25042U 97069D   25218.94665296  .00000553  00000+0  13942-3 0  9993",
    "tle2": "2 25042  86.3949 189.3797 0019449 132.2017 228.0842 14.49268140456315",
    "timestamp": 1754547907,
    "satNb": 39,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-11-09",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 38",
    "tle1": "1 25043U 97069E   25218.89178355  .00000391  00000+0  12232-3 0  9994",
    "tle2": "2 25043  86.3957 211.8262 0000892  31.1075 329.0176 14.38150738453248",
    "timestamp": 1754547907,
    "satNb": 38,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-11-09",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 42",
    "tle1": "1 25077U 97077A   25218.75129004  .00000336  00000+0  10803-3 0  9993",
    "tle2": "2 25077  86.3952 218.1148 0001751  72.1513 287.9875 14.36382830448453",
    "timestamp": 1754547907,
    "satNb": 42,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-12-08",
    "launchvehicle": "Chang Zheng 2C-III\/SD",
    "launchsite": "Taiyuan"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 44",
    "tle1": "1 25078U 97077B   25218.91666864  .00000386  00000+0  11558-3 0  9995",
    "tle2": "2 25078  86.3978 199.8467 0001700 142.5170 217.6148 14.40274135451007",
    "timestamp": 1754547907,
    "satNb": 44,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-12-08",
    "launchvehicle": "Chang Zheng 2C-III\/SD",
    "launchsite": "Taiyuan"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 45",
    "tle1": "1 25104U 97082A   25218.91064349  .00021909  00000+0  74967-3 0  9998",
    "tle2": "2 25104  86.3570  23.2241 0114535 140.7049 220.2581 15.23944154459760",
    "timestamp": 1754547907,
    "satNb": 45,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-12-20",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 24",
    "tle1": "1 25105U 97082B   25218.61620882  .00000377  00000+0  10856-3 0  9999",
    "tle2": "2 25105  86.3862  58.8976 0009245 272.3470  87.6671 14.42136359450480",
    "timestamp": 1754547907,
    "satNb": 24,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1997-08-21",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 51",
    "tle1": "1 25262U 98018A   25218.93738667  .00032366  00000+0  64779-3 0  9995",
    "tle2": "2 25262  86.3804  30.6357 0082133  55.4756 305.4218 15.42922896454847",
    "timestamp": 1754547907,
    "satNb": 51,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1998-03-25",
    "launchvehicle": "Chang Zheng 2C-III\/SD",
    "launchsite": "Taiyuan"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 57",
    "tle1": "1 25273U 98019B   25218.97344100  .00000251  00000+0  79638-4 0  9996",
    "tle2": "2 25273  86.3981 123.9927 0002085  84.8556 275.2879 14.35921149432075",
    "timestamp": 1754547907,
    "satNb": 57,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1998-03-30",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 63",
    "tle1": "1 25286U 98021B   25218.60963038  .00000292  00000+0  92693-4 0  9991",
    "tle2": "2 25286  86.3935  60.9668 0002293  90.6577 269.4883 14.36574700431087",
    "timestamp": 1754547907,
    "satNb": 63,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1998-04-07",
    "launchvehicle": "Proton-K\/17S40",
    "launchsite": "Baikonur"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 69",
    "tle1": "1 25319U 98026A   25218.88412696  .00000398  00000+0  11757-3 0  9990",
    "tle2": "2 25319  86.3928  73.9903 0001939 157.7639 202.3645 14.41007160430361",
    "timestamp": 1754547907,
    "satNb": 69,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1998-05-02",
    "launchvehicle": "Chang Zheng 2C-III\/SD",
    "launchsite": "Taiyuan"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 71",
    "tle1": "1 25320U 98026B   25218.67609076  .00000304  00000+0  87967-4 0  9993",
    "tle2": "2 25320  86.3927  68.7593 0000418   9.3839 350.7369 14.41190521430864",
    "timestamp": 1754547907,
    "satNb": 71,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1998-05-02",
    "launchvehicle": "Chang Zheng 2C-III\/SD",
    "launchsite": "Taiyuan"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 73",
    "tle1": "1 25344U 98032C   25218.93023476  .00000511  00000+0  12209-3 0  9995",
    "tle2": "2 25344  86.4409  25.2538 0002309 107.9275 252.2183 14.51760588437924",
    "timestamp": 1754547907,
    "satNb": 73,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1998-05-17",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium",
    "name": "IRIDIUM 82",
    "tle1": "1 25467U 98051A   25218.87083194  .00024143  00000+0  64569-3 0  9991",
    "tle2": "2 25467  86.3629  84.7744 0084129 103.3962 257.6684 15.34305511431725",
    "timestamp": 1754547907,
    "satNb": 82,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "1998-09-08",
    "launchvehicle": "Delta II 7920-10C",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 106",
    "tle1": "1 41917U 17003A   25218.92784965  .00000030  00000+0  36218-5 0  9998",
    "tle2": "2 41917  86.3957 219.7964 0002125 101.7234 258.4200 14.34217720448163",
    "timestamp": 1754547907,
    "satNb": 106,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 103",
    "tle1": "1 41918U 17003B   25218.70585844  .00000001  00000+0 -66107-5 0  9999",
    "tle2": "2 41918  86.3960 219.7901 0001691  80.2997 279.8389 14.34217539448155",
    "timestamp": 1754547907,
    "satNb": 103,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 109",
    "tle1": "1 41919U 17003C   25218.92150738  .00000058  00000+0  13601-4 0  9995",
    "tle2": "2 41919  86.3957 219.7541 0002278  85.5640 274.5816 14.34217926448154",
    "timestamp": 1754547907,
    "satNb": 109,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 102",
    "tle1": "1 41920U 17003D   25218.75025737  .00000015  00000+0 -18391-5 0  9994",
    "tle2": "2 41920  86.3960 219.7560 0002294  88.0404 272.1054 14.34217663448218",
    "timestamp": 1754547907,
    "satNb": 102,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 105",
    "tle1": "1 41921U 17003E   25218.93029867  .00000019  00000+0 -11450-6 0  9997",
    "tle2": "2 41921  86.4014 188.1692 0002020  84.3078 275.8348 14.34216210450090",
    "timestamp": 1754547907,
    "satNb": 105,
    "orbitalPlane": 5,
    "status": "Spare",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 104",
    "tle1": "1 41922U 17003F   25218.55363668  .00000051  00000+0  11113-4 0  9995",
    "tle2": "2 41922  86.3957 219.8759 0002264  79.4354 280.7096 14.34217959448176",
    "timestamp": 1754547907,
    "satNb": 104,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 114",
    "tle1": "1 41923U 17003G   25218.55997951  .00000037  00000+0  61713-5 0  9990",
    "tle2": "2 41923  86.3955 219.8574 0002031  88.1897 271.9532 14.34217693448151",
    "timestamp": 1754547907,
    "satNb": 114,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 108",
    "tle1": "1 41924U 17003H   25218.93711259  .00000025  00000+0  18681-5 0  9991",
    "tle2": "2 41924  86.4006 188.0645 0002362  90.8754 269.2713 14.34217539450068",
    "timestamp": 1754547907,
    "satNb": 108,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 112",
    "tle1": "1 41925U 17003J   25218.75660022  .00000032  00000+0  43911-5 0  9995",
    "tle2": "2 41925  86.3954 219.6319 0002368  87.7212 272.4255 14.34217756448200",
    "timestamp": 1754547907,
    "satNb": 112,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 111",
    "tle1": "1 41926U 17003K   25218.95321939  .00000033  00000+0  48288-5 0  9992",
    "tle2": "2 41926  86.3955 219.6133 0002174  92.1131 268.0314 14.34217471448213",
    "timestamp": 1754547907,
    "satNb": 111,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2017-01-14",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 113",
    "tle1": "1 42803U 17039A   25218.93318511  .00000000  00000+0 -70375-5 0  9993",
    "tle2": "2 42803  86.3940  93.5495 0002055  78.6524 281.4903 14.34217406426144",
    "timestamp": 1754547907,
    "satNb": 113,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 123",
    "tle1": "1 42804U 17039B   25218.83512492  .00000078  00000+0  20637-4 0  9996",
    "tle2": "2 42804  86.3992 125.0710 0001892  88.3492 271.7921 14.34218269424893",
    "timestamp": 1754547907,
    "satNb": 123,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 120",
    "tle1": "1 42805U 17039C   25218.92684249  .00000060  00000+0  14505-4 0  9995",
    "tle2": "2 42805  86.3929  93.3755 0002138  93.7080 266.4360 14.34217796426138",
    "timestamp": 1754547907,
    "satNb": 120,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 115",
    "tle1": "1 42806U 17039D   25218.91120968  .00000292  00000+0  80927-4 0  9996",
    "tle2": "2 42806  86.4468  93.4680 0001535  98.9490 261.1884 14.43281585428938",
    "timestamp": 1754547907,
    "satNb": 115,
    "orbitalPlane": 2,
    "status": "Spare",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 118",
    "tle1": "1 42807U 17039E   25218.79707146  .00000087  00000+0  24002-4 0  9996",
    "tle2": "2 42807  86.3992 125.0862 0002236  78.7782 281.3665 14.34217874424884",
    "timestamp": 1754547907,
    "satNb": 118,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 117",
    "tle1": "1 42808U 17039F   25218.81609852  .00000011  00000+0 -30609-5 0  9994",
    "tle2": "2 42808  86.3991 125.0386 0001832  82.3601 277.7803 14.34217506424916",
    "timestamp": 1754547907,
    "satNb": 117,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 126",
    "tle1": "1 42809U 17039G   25218.84148538  .00000225  00000+0  73193-4 0  9997",
    "tle2": "2 42809  86.3994 125.0744 0002035  79.4487 280.6938 14.34216385424896",
    "timestamp": 1754547907,
    "satNb": 126,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 124",
    "tle1": "1 42810U 17039H   25218.84502397  .00000303  00000+0  84166-4 0  9995",
    "tle2": "2 42810  86.4444  61.7755 0002185  93.3145 266.8306 14.43282726429778",
    "timestamp": 1754547907,
    "satNb": 124,
    "orbitalPlane": 1,
    "status": "Spare",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 128",
    "tle1": "1 42811U 17039J   25218.90197644 -.00000007  00000+0 -96507-5 0  9994",
    "tle2": "2 42811  86.4029 156.5292 0002092  93.4016 266.7419 14.34217453424934",
    "timestamp": 1754547907,
    "satNb": 128,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 121",
    "tle1": "1 42812U 17039K   25218.86049669  .00000226  00000+0  73786-4 0  9997",
    "tle2": "2 42812  86.3993 125.0919 0002263  87.6749 272.4706 14.34219648424772",
    "timestamp": 1754547907,
    "satNb": 121,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2017-06-25",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 133",
    "tle1": "1 42955U 17061A   25218.86392045  .00000065  00000+0  16249-4 0  9991",
    "tle2": "2 42955  86.4031 156.6548 0002227  85.2031 274.9419 14.34217937409725",
    "timestamp": 1754547907,
    "satNb": 133,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 100",
    "tle1": "1 42956U 17061B   25218.85757662  .00000042  00000+0  77857-5 0  9999",
    "tle2": "2 42956  86.4028 156.5837 0002053  86.7222 273.4209 14.34218158409724",
    "timestamp": 1754547907,
    "satNb": 100,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 122",
    "tle1": "1 42957U 17061C   25218.89563350  .00000013  00000+0 -23510-5 0  9999",
    "tle2": "2 42957  86.4027 156.5669 0002195  84.5187 275.6259 14.34217648409733",
    "timestamp": 1754547907,
    "satNb": 122,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 129",
    "tle1": "1 42958U 17061D   25218.92100449 -.00000034  00000+0 -19202-4 0  9996",
    "tle2": "2 42958  86.4030 156.6199 0002401  74.9278 285.2183 14.34217577409757",
    "timestamp": 1754547907,
    "satNb": 129,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 119",
    "tle1": "1 42959U 17061E   25218.88929069  .00000016  00000+0 -13590-5 0  9993",
    "tle2": "2 42959  86.4027 156.6274 0002066  78.8786 281.2642 14.34217655409766",
    "timestamp": 1754547907,
    "satNb": 119,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 107",
    "tle1": "1 42960U 17061F   25218.90831763  .00000234  00000+0  76548-4 0  9993",
    "tle2": "2 42960  86.4029 156.6389 0001783  87.2104 272.9296 14.34218203409773",
    "timestamp": 1754547907,
    "satNb": 107,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 132",
    "tle1": "1 42961U 17061G   25218.91465973  .00000148  00000+0  45804-4 0  9996",
    "tle2": "2 42961  86.4028 156.6181 0002150  86.4386 273.7055 14.34217355409774",
    "timestamp": 1754547907,
    "satNb": 132,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 136",
    "tle1": "1 42962U 17061H   25218.87660557 -.00000025  00000+0 -15951-4 0  9993",
    "tle2": "2 42962  86.4031 156.6390 0001912  80.4449 279.6962 14.34217311409785",
    "timestamp": 1754547907,
    "satNb": 136,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 139",
    "tle1": "1 42963U 17061J   25218.88294769  .00000149  00000+0  46256-4 0  9990",
    "tle2": "2 42963  86.4029 156.6932 0002021  88.1255 272.0173 14.34217918409792",
    "timestamp": 1754547907,
    "satNb": 139,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 125",
    "tle1": "1 42964U 17061K   25218.87026139  .00000008  00000+0 -42316-5 0  9993",
    "tle2": "2 42964  86.4033 156.7538 0001676  72.7774 287.3605 14.34217558409802",
    "timestamp": 1754547907,
    "satNb": 125,
    "orbitalPlane": 4,
    "status": "Operational",
    "launchdate": "2017-10-09",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 135",
    "tle1": "1 43070U 17083A   25218.91415804  .00000073  00000+0  19052-4 0  9993",
    "tle2": "2 43070  86.3937  93.4146 0002344  87.2324 272.9140 14.34217563399101",
    "timestamp": 1754547907,
    "satNb": 135,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 138",
    "tle1": "1 43071U 17083B   25218.93952735  .00000019  00000+0 -28229-6 0  9994",
    "tle2": "2 43071  86.3923  93.0678 0002026  69.7790 290.3624 14.34217556399093",
    "timestamp": 1754547907,
    "satNb": 138,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 116",
    "tle1": "1 43072U 17083C   25218.69850909  .00000012  00000+0 -26330-5 0  9991",
    "tle2": "2 43072  86.3934  93.4944 0002045  92.7353 267.4077 14.34217532399099",
    "timestamp": 1754547907,
    "satNb": 116,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 130",
    "tle1": "1 43073U 17083D   25218.73656069  .00000173  00000+0  54553-4 0  9992",
    "tle2": "2 43073  86.3943  93.7236 0001997  95.8828 264.2595 14.34216505399047",
    "timestamp": 1754547907,
    "satNb": 130,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 151",
    "tle1": "1 43074U 17083E   25218.92050010  .00000092  00000+0  25696-4 0  9994",
    "tle2": "2 43074  86.3936  93.4527 0002236  92.0559 268.0893 14.34217814399099",
    "timestamp": 1754547907,
    "satNb": 151,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 134",
    "tle1": "1 43075U 17083F   25218.88878665  .00000036  00000+0  57384-5 0  9992",
    "tle2": "2 43075  86.3938  93.4697 0001941  92.9375 267.2043 14.34217584399055",
    "timestamp": 1754547907,
    "satNb": 134,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 137",
    "tle1": "1 43076U 17083G   25218.90147332  .00000106  00000+0  30867-4 0  9990",
    "tle2": "2 43076  86.3941  93.5508 0002674  95.0239 265.1262 14.34217993399121",
    "timestamp": 1754547907,
    "satNb": 137,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 141",
    "tle1": "1 43077U 17083H   25218.89512761  .00000139  00000+0  42504-4 0  9998",
    "tle2": "2 43077  86.3934  93.4018 0002174  82.1354 278.0089 14.34217123399124",
    "timestamp": 1754547907,
    "satNb": 141,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 153",
    "tle1": "1 43078U 17083J   25218.84730786  .00000049  00000+0  10465-4 0  9994",
    "tle2": "2 43078  86.3920  61.8747 0001977  77.1251 283.0165 14.34217425400228",
    "timestamp": 1754547907,
    "satNb": 153,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 131",
    "tle1": "1 43079U 17083K   25218.67313914  .00000008  00000+0 -42600-5 0  9999",
    "tle2": "2 43079  86.3940  93.6596 0002159  82.9464 277.1977 14.34217432399027",
    "timestamp": 1754547907,
    "satNb": 131,
    "orbitalPlane": 2,
    "status": "Operational",
    "launchdate": "2017-12-23",
    "launchvehicle": "Falcon 9 FT",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 144",
    "tle1": "1 43249U 18030A   25218.92341907  .00000106  00000+0  30796-4 0  9992",
    "tle2": "2 43249  86.3917  61.7792 0002170  91.3998 268.7446 14.34217958385095",
    "timestamp": 1754547907,
    "satNb": 144,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 149",
    "tle1": "1 43250U 18030B   25218.92976148 -.00000060  00000+0 -28502-4 0  9998",
    "tle2": "2 43250  86.3916  61.7469 0002043  91.4534 268.6896 14.34217556385118",
    "timestamp": 1754547907,
    "satNb": 149,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 157",
    "tle1": "1 43251U 18030C   25218.66971588  .00000044  00000+0  85393-5 0  9995",
    "tle2": "2 43251  86.3919  61.9021 0002320  85.0265 275.1196 14.34217724385052",
    "timestamp": 1754547907,
    "satNb": 157,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 140",
    "tle1": "1 43252U 18030D   25218.68874284  .00000013  00000+0 -23619-5 0  9993",
    "tle2": "2 43252  86.3918  61.9074 0001891  91.6249 268.5163 14.34217525385113",
    "timestamp": 1754547907,
    "satNb": 140,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 145",
    "tle1": "1 43253U 18030E   25218.67605789  .00000041  00000+0  77268-5 0  9994",
    "tle2": "2 43253  86.3919  61.8857 0002151  99.7086 260.4353 14.34217725385047",
    "timestamp": 1754547907,
    "satNb": 145,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 146",
    "tle1": "1 43254U 18030F   25218.93610406  .00000005  00000+0 -53906-5 0  9990",
    "tle2": "2 43254  86.3917  61.7899 0002031  98.7786 261.3640 14.34217477385092",
    "timestamp": 1754547907,
    "satNb": 146,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 148",
    "tle1": "1 43255U 18030G   25218.62531744  .00000019  00000+0 -13006-6 0  9997",
    "tle2": "2 43255  86.3919  61.9584 0002185  89.6584 270.4862 14.34217608385085",
    "timestamp": 1754547907,
    "satNb": 148,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 142",
    "tle1": "1 43256U 18030H   25218.94244683  .00000020  00000+0 -44834-7 0  9992",
    "tle2": "2 43256  86.3915  61.7261 0002119 102.4174 257.7259 14.34217594385091",
    "timestamp": 1754547907,
    "satNb": 142,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 150",
    "tle1": "1 43257U 18030J   25218.63165972  .00000032  00000+0  43628-5 0  9992",
    "tle2": "2 43257  86.3919  61.9624 0002060  95.0500 265.0931 14.34217631385075",
    "timestamp": 1754547907,
    "satNb": 150,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 143",
    "tle1": "1 43258U 18030K   25218.61263191  .00000059  00000+0  14130-4 0  9997",
    "tle2": "2 43258  86.3923  62.0508 0002116 101.3121 258.8313 14.34217824385007",
    "timestamp": 1754547907,
    "satNb": 143,
    "orbitalPlane": 1,
    "status": "Operational",
    "launchdate": "2018-03-30",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 161",
    "tle1": "1 43478U 18047C   25218.75363851  .00000159  00000+0  41401-4 0  9990",
    "tle2": "2 43478  86.4478 219.8021 0002360  83.5426 276.6044 14.43281581379787",
    "timestamp": 1754547907,
    "satNb": 161,
    "orbitalPlane": 6,
    "status": "Spare",
    "launchdate": "2018-05-22",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 152",
    "tle1": "1 43479U 18047D   25218.93420258  .00000142  00000+0  43776-4 0  9995",
    "tle2": "2 43479  86.3952 219.5873 0002191  87.0389 273.1057 14.34214454377447",
    "timestamp": 1754547907,
    "satNb": 152,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2018-05-22",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 147",
    "tle1": "1 43480U 18047E   25218.94053551  .00000006  00000+0 -49613-5 0  9993",
    "tle2": "2 43480  86.3956 219.5844 0002287  87.1826 272.9631 14.34217534377441",
    "timestamp": 1754547907,
    "satNb": 147,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2018-05-22",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 110",
    "tle1": "1 43481U 18047F   25218.94687745  .00000014  00000+0 -20032-5 0  9995",
    "tle2": "2 43481  86.3959 219.6654 0002296  77.3715 282.7737 14.34217597377437",
    "timestamp": 1754547907,
    "satNb": 110,
    "orbitalPlane": 6,
    "status": "Operational",
    "launchdate": "2018-05-22",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 162",
    "tle1": "1 43482U 18047G   25218.53935204  .00000154  00000+0  39825-4 0  9990",
    "tle2": "2 43482  86.4476 219.7863 0002198  82.0459 278.0991 14.43280351379749",
    "timestamp": 1754547907,
    "satNb": 162,
    "orbitalPlane": 6,
    "status": "Spare",
    "launchdate": "2018-05-22",
    "launchvehicle": "Falcon 9 B4",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 160",
    "tle1": "1 43569U 18061A   25218.89271434  .00000028  00000+0  27602-5 0  9990",
    "tle2": "2 43569  86.4009 188.1089 0002318  80.9700 279.1759 14.34217509368327",
    "timestamp": 1754547907,
    "satNb": 160,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 166",
    "tle1": "1 43570U 18061B   25218.91808447  .00000019  00000+0 -41987-6 0  9999",
    "tle2": "2 43570  86.4009 188.0530 0002243  93.3922 266.7530 14.34217551368359",
    "timestamp": 1754547907,
    "satNb": 166,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 158",
    "tle1": "1 43571U 18061C   25218.88637106  .00000027  00000+0  26689-5 0  9997",
    "tle2": "2 43571  86.4009 188.0761 0002105  84.7187 275.4249 14.34217652368312",
    "timestamp": 1754547907,
    "satNb": 158,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 165",
    "tle1": "1 43572U 18061D   25218.91174077  .00000236  00000+0  77071-4 0  9997",
    "tle2": "2 43572  86.4010 188.1057 0002396  89.5779 270.5692 14.34218933368340",
    "timestamp": 1754547907,
    "satNb": 165,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 155",
    "tle1": "1 43573U 18061E   25218.94345365  .00000018  00000+0 -74356-6 0  9995",
    "tle2": "2 43573  86.4010 187.9777 0001859  88.9528 271.1881 14.34217543368315",
    "timestamp": 1754547907,
    "satNb": 155,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 154",
    "tle1": "1 43574U 18061F   25218.92442683  .00000029  00000+0  34084-5 0  9999",
    "tle2": "2 43574  86.4010 188.1032 0002276  86.7836 273.3621 14.34217165368366",
    "timestamp": 1754547907,
    "satNb": 154,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 163",
    "tle1": "1 43575U 18061G   25218.90540001  .00000231  00000+0  75589-4 0  9990",
    "tle2": "2 43575  86.4007 188.0364 0002244  83.3601 276.7851 14.34218951368331",
    "timestamp": 1754547907,
    "satNb": 163,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 156",
    "tle1": "1 43576U 18061H   25218.94979699 -.00000042  00000+0 -21940-4 0  9998",
    "tle2": "2 43576  86.4011 188.0252 0001933  93.7521 266.3896 14.34217248368335",
    "timestamp": 1754547907,
    "satNb": 156,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 164",
    "tle1": "1 43577U 18061J   25218.93077008  .00000066  00000+0  16645-4 0  9991",
    "tle2": "2 43577  86.4009 188.0680 0002437  90.9723 269.1752 14.34217788368376",
    "timestamp": 1754547907,
    "satNb": 164,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 159",
    "tle1": "1 43578U 18061K   25218.89905502  .00000113  00000+0  33117-4 0  9992",
    "tle2": "2 43578  86.4006 188.0247 0002487  83.9434 276.2045 14.34216983368335",
    "timestamp": 1754547907,
    "satNb": 159,
    "orbitalPlane": 5,
    "status": "Operational",
    "launchdate": "2018-07-25",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 180",
    "tle1": "1 43922U 19002A   25218.82878426  .00000110  00000+0  32320-4 0  9990",
    "tle2": "2 43922  86.3993 125.0364 0002172  81.1697 278.9745 14.34217838343930",
    "timestamp": 1754547907,
    "satNb": 180,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 176",
    "tle1": "1 43923U 19002B   25218.74037810  .00000734  00000+0  11251-3 0  9997",
    "tle2": "2 43923  86.6116 125.0616 0001736  84.6556 275.4859 14.72255720352985",
    "timestamp": 1754547907,
    "satNb": 176,
    "orbitalPlane": 3,
    "status": "Spare",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 168",
    "tle1": "1 43924U 19002C   25218.82244155  .00000087  00000+0  23829-4 0  9995",
    "tle2": "2 43924  86.3994 125.1075 0002196  83.6213 276.5232 14.34217936343912",
    "timestamp": 1754547907,
    "satNb": 168,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 173",
    "tle1": "1 43925U 19002D   25218.80975447  .00000236  00000+0  77189-4 0  9993",
    "tle2": "2 43925  86.3991 125.0145 0002062  81.1190 279.0239 14.34218038343892",
    "timestamp": 1754547907,
    "satNb": 173,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 169",
    "tle1": "1 43926U 19002E   25218.92971476  .00000280  00000+0  84925-4 0  9990",
    "tle2": "2 43926  86.4285 156.5568 0000913  79.2567 280.8735 14.38608088345049",
    "timestamp": 1754547907,
    "satNb": 169,
    "orbitalPlane": 4,
    "status": "Spare",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 172",
    "tle1": "1 43927U 19002F   25218.80341206  .00000158  00000+0  49216-4 0  9998",
    "tle2": "2 43927  86.3989 125.0241 0002380  78.3883 281.7580 14.34217353343908",
    "timestamp": 1754547907,
    "satNb": 172,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 175",
    "tle1": "1 43928U 19002G   25218.87136044  .00000719  00000+0  11014-3 0  9995",
    "tle2": "2 43928  86.1460  74.6241 0002235 109.7965 250.3492 14.72246018352994",
    "timestamp": 1754547907,
    "satNb": 175,
    "orbitalPlane": 3,
    "status": "Spare",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 171",
    "tle1": "1 43929U 19002H   25218.85415187  .00000075  00000+0  19661-4 0  9994",
    "tle2": "2 43929  86.4000 125.2745 0002270  92.0240 268.1216 14.34216710343905",
    "timestamp": 1754547907,
    "satNb": 171,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 170",
    "tle1": "1 43930U 19002J   25218.81452744  .00000804  00000+0  12360-3 0  9990",
    "tle2": "2 43930  86.6115 125.0350 0002263  87.0653 273.0823 14.72255605353009",
    "timestamp": 1754547907,
    "satNb": 170,
    "orbitalPlane": 3,
    "status": "Spare",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 167",
    "tle1": "1 43931U 19002K   25218.77804134  .00000157  00000+0  48928-4 0  9991",
    "tle2": "2 43931  86.3992 125.0545 0002038  95.9948 264.1480 14.34218842343897",
    "timestamp": 1754547907,
    "satNb": 167,
    "orbitalPlane": 3,
    "status": "Operational",
    "launchdate": "2019-01-11",
    "launchvehicle": "Falcon 9 B5",
    "launchsite": "Vandenberg"
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 181",
    "tle1": "1 56726U 23068S   25218.90565620  .00000273  00000+0  75142-4 0  9990",
    "tle2": "2 56726  86.4547 188.0624 0002806  95.1081 265.0440 14.43306986117106",
    "timestamp": 1754547907,
    "satNb": 181,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "",
    "launchvehicle": "",
    "launchsite": ""
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 177",
    "tle1": "1 56727U 23068T   25218.77230130  .00000692  00000+0  87587-4 0  9992",
    "tle2": "2 56727  86.1978 118.1278 0002267  93.2223 266.9257 14.80223110119857",
    "timestamp": 1754547907,
    "satNb": 177,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "",
    "launchvehicle": "",
    "launchsite": ""
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 174",
    "tle1": "1 56728U 23068U   25218.80215199  .00000819  00000+0  12599-3 0  9996",
    "tle2": "2 56728  86.6123 125.1554 0002245  73.3294 286.8170 14.72244747119768",
    "timestamp": 1754547907,
    "satNb": 174,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "",
    "launchvehicle": "",
    "launchsite": ""
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 178",
    "tle1": "1 56729U 23068V   25218.89660637  .00001296  00000+0  16715-3 0  9991",
    "tle2": "2 56729  86.6605 156.6827 0002477  82.4034 277.7468 14.80225179119874",
    "timestamp": 1754547907,
    "satNb": 178,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "",
    "launchvehicle": "",
    "launchsite": ""
}, {
    "type": "Iridium NEXT",
    "name": "IRIDIUM 179",
    "tle1": "1 56730U 23068W   25218.89123061  .00001073  00000+0  13782-3 0  9992",
    "tle2": "2 56730  86.6845 164.7065 0002358  91.0196 269.1296 14.80229731119871",
    "timestamp": 1754547907,
    "satNb": 179,
    "orbitalPlane": 0,
    "status": "Not operational",
    "launchdate": "",
    "launchvehicle": "",
    "launchsite": ""
}];
// Define the icon once
const satelliteIcon = L.icon({
    iconUrl: 'sat1.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16], // center
    popupAnchor: [0, -16]
});

// Create markers
const iridiumSatellites = iridiumTLEs.map(sat => {
    const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);
    const marker = L.marker([0, 0], { icon: satelliteIcon }).addTo(map).bindPopup(sat.name);
    // Create a circle (initially hidden)
    const coverageCircle = L.circle([0, 0], {
        radius: 0, // meters
        color: 'blue',
        fillColor: '#3399ff',
        fillOpacity: 0
    }).addTo(map).setStyle({ opacity: 0 }); // hide initially

    const dopplerCircle = L.circle([0, 0], {
        radius: 0, // meters
        color: 'green',
        fillColor: '#00FF00',
        fillOpacity: 0
    }).addTo(map).setStyle({ opacity: 0 }); // hide initially

// Show circle on marker click
    marker.on('click', () => {
        // Hide the previously active circle
        if (activeCoverageCircle && activeCoverageCircle !== coverageCircle) {
            activeCoverageCircle.setStyle({ opacity: 0, fillOpacity: 0 });
            activeDopplerCircle.setStyle({ opacity: 0, fillOpacity: 0 });
        }

        // Set and show the new active circle
        coverageCircle.setLatLng(marker.getLatLng());
        coverageCircle.setStyle({ opacity: 1, fillOpacity: 0.2 });

        dopplerCircle.setLatLng(marker.getLatLng());
        dopplerCircle.setStyle({ opacity: 1, fillOpacity: 0.2 });

        map.panTo(marker.getLatLng());
        activeCoverageCircle = coverageCircle;
        activeDopplerCircle = dopplerCircle;
    });

    return { name: sat.name, satrec, marker, coverageCircle, dopplerCircle };
});


// Update positions every 2 seconds
function updatePositions() {
    const now = new Date();
    const gmst = satellite.gstime(now);

    iridiumSatellites.forEach(sat => {
        const posVel = satellite.propagate(sat.satrec, now);
        if (!posVel.position) return;

        const posGd = satellite.eciToGeodetic(posVel.position, gmst);
        const lat = satellite.degreesLat(posGd.latitude);
        const lon = satellite.degreesLong(posGd.longitude);
        const hgt = posGd.height;

        sat.marker.setLatLng([lat, lon]);

        // Update coverage circle
        sat.coverageCircle.setLatLng([lat, lon]);
        sat.coverageCircle.setRadius(groundRangeMeters(hgt)); // meters

        sat.dopplerCircle.setLatLng([lat, lon]);
        sat.dopplerCircle.setRadius(dopplerRangeMeters(hgt)); // meters
    });
}

var rEarthKm = 6378.14;
var elevationAngleRad = (90 - 8.2) / 180 * Math.PI;
function groundRangeMeters(heightKm) {
    var rDirectLineKm = Math.sqrt(Math.pow(rEarthKm * Math.cos(elevationAngleRad), 2) + Math.pow(rEarthKm + heightKm, 2) - Math.pow(rEarthKm, 2)) - rEarthKm * Math.cos(elevationAngleRad);
    var rGroundLineKm = Math.sqrt(Math.pow(rDirectLineKm, 2) - Math.pow(heightKm, 2));
    return Math.round(rGroundLineKm * 1000)
}

var dopplerAngleRad = (90 - 60) / 180 * Math.PI;
function dopplerRangeMeters(heightKm) {
    var rDirectLineKm = Math.sqrt(Math.pow(rEarthKm * Math.cos(dopplerAngleRad), 2) + Math.pow(rEarthKm + heightKm, 2) - Math.pow(rEarthKm, 2)) - rEarthKm * Math.cos(dopplerAngleRad);
    var rGroundLineKm = Math.sqrt(Math.pow(rDirectLineKm, 2) - Math.pow(heightKm, 2));
    return Math.round(rGroundLineKm * 1000)
}

updatePositions(); // initial update
setInterval(updatePositions, 2000); // update every 2 seconds

// Add legend to the map
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');

    // Example legend entries
    div.innerHTML = `
    <h4>Legend</h4>
    <i style="background: #3399ff; opacity: 0.6; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Coverage Area<br>
    <i style="background: #00FF00; opacity: 0.6; width: 12px; height: 12px; display: inline-block; margin-right: 5px;"></i> Doppler Trigger Area<br>
  `;

    return div;
};

legend.addTo(map);