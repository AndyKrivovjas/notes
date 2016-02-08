class Error:

    RESPONSE_101_NO_PERMISSION = {"error_code": 101, "error_message": "You don't have permissions for this action."},
    RESPONSE_102_EMPTY_RESPONSE = {"error_code": 102, "error_message": "There is no data."},
    RESPONSE_103_USER_DOESNT_EXIST = {"error_code": 103, "error_message": "There is no user with username {0}."},