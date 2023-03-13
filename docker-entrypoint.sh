#!/bin/bash

dockerize -wait tcp://postgresql:5432 -wait tcp://redis:6379 -timeout 20s

echo "Start Wait Postgresql and Redis"