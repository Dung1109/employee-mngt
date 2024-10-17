package org.andy.employee_be.enums;

public enum Status {

    ACTIVE(1),
    INACTIVE(2);

    private final int value;

    Status(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
