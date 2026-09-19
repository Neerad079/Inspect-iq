package com.smartinspect.util;

public class InspectionIdGenerator {

    private InspectionIdGenerator() {
        // Utility class
    }

    public static String generateCode(long count) {
        return "INS-" + (1000 + count);
    }
}
