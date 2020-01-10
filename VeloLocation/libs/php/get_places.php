<?php
if (isset($_POST['table'])) {
    echo file_get_contents("../json/".$_POST['table'].".json");
}
