package com.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UnauthorizedAuthorException extends RuntimeException {
    public UnauthorizedAuthorException(String message) {
        super(message);
    }
}